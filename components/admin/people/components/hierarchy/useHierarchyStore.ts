import { create } from 'zustand';
import { AdminTeamMember } from '@/lib/services/people.service';
import type { ChildNode, SubChildNode } from '@/components/pages/company/people/leaderTeamData';
import type { EditTarget } from '../NodeEditModal';

interface HierarchyState {
  // Data State
  leaders: AdminTeamMember[];
  allMembers: AdminTeamMember[];
  selectedLeaderId: string;
  departmentScope: string;
  overview: string;
  childNodes: ChildNode[];
  hasChanges: boolean;

  // UI & View State
  zoomScale: number;
  isPoolOpen: boolean;
  isScopeOpen: boolean;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string | null;
  successMessage: string | null;

  // Edit Modal State
  editTarget: EditTarget | null;
  isEditModalOpen: boolean;

  // Actions
  init: (leaders: AdminTeamMember[], allMembers: AdminTeamMember[], initialLeaderId?: string) => void;
  selectLeader: (nextId: string) => void;
  loadHierarchy: (leaderId?: string) => Promise<void>;
  setDepartmentScope: (val: string) => void;
  setOverview: (val: string) => void;
  setZoomScale: (val: number | ((prev: number) => number)) => void;
  togglePool: () => void;
  setIsPoolOpen: (open: boolean) => void;
  toggleScope: () => void;
  setIsScopeOpen: (open: boolean) => void;
  setErrorMessage: (msg: string | null) => void;
  setSuccessMessage: (msg: string | null) => void;
  openEditModal: (target: EditTarget) => void;
  closeEditModal: () => void;

  // Tree Manipulation Actions
  addSquad: (initialMember?: AdminTeamMember) => void;
  deleteSquad: (squadIndex: number) => void;
  addSubMember: (squadIndex: number, memberToAdd?: AdminTeamMember) => void;
  deleteSubMember: (squadIndex: number, subIndex: number) => void;
  addSubChild: (squadIndex: number, subIndex: number, memberToAdd?: AdminTeamMember) => void;
  deleteSubChild: (squadIndex: number, subIndex: number, childIndex: number) => void;
  dropOnSquadLead: (squadIndex: number, droppedMember: AdminTeamMember) => void;
  dropOnSubMember: (squadIndex: number, subIndex: number, droppedMember: AdminTeamMember) => void;
  dropOnSubChild: (squadIndex: number, subIndex: number, childIndex: number, droppedMember: AdminTeamMember) => void;

  // Modal Save Actions
  saveLeaderModal: (newLeaderId: string) => void;
  saveSquadLeadModal: (squadIndex: number, updatedProps: Partial<ChildNode>, newMemberId?: string) => void;
  saveSubMemberModal: (squadIndex: number, subIndex: number, resp: string, newMemberId?: string) => void;
  saveSubChildModal: (
    squadIndex: number,
    subIndex: number,
    childIndex: number,
    resp: string,
    newMemberId?: string
  ) => void;

  // Save to DB
  saveHierarchy: () => Promise<boolean>;
}

export const useHierarchyStore = create<HierarchyState>((set, get) => ({
  leaders: [],
  allMembers: [],
  selectedLeaderId: '',
  departmentScope: '',
  overview: '',
  childNodes: [],
  hasChanges: false,

  zoomScale: 0.85,
  isPoolOpen: true,
  isScopeOpen: false,
  isLoading: false,
  isSaving: false,
  errorMessage: null,
  successMessage: null,

  editTarget: null,
  isEditModalOpen: false,

  init: (leaders, allMembers, initialLeaderId) => {
    const current = get();
    const defaultLeaderId = initialLeaderId || leaders[0]?.id || '';
    if (current.leaders.length === 0 || (initialLeaderId && current.selectedLeaderId !== initialLeaderId)) {
      set({
        leaders,
        allMembers,
        selectedLeaderId: defaultLeaderId,
      });
      if (defaultLeaderId) {
        get().loadHierarchy(defaultLeaderId);
      }
    } else {
      set({ leaders, allMembers });
    }
  },

  selectLeader: (nextId: string) => {
    if (!nextId) return;
    const { selectedLeaderId, hasChanges, loadHierarchy } = get();
    if (nextId === selectedLeaderId) return;

    if (hasChanges) {
      const confirmLeave = confirm(
        'Bạn có thay đổi chưa lưu trên sơ đồ hiện tại. Bạn có chắc chắn muốn chuyển sang Lãnh đạo khác và hủy các thay đổi?'
      );
      if (!confirmLeave) return;
    }

    set({ selectedLeaderId: nextId });
    loadHierarchy(nextId);
  },

  loadHierarchy: async (targetLeaderId?: string) => {
    const leaderId = targetLeaderId || get().selectedLeaderId;
    if (!leaderId) return;

    try {
      set({ isLoading: true, errorMessage: null });
      const res = await fetch(`/api/admin/people/hierarchy?leaderId=${leaderId}`);
      const data = await res.json();

      if (data.success && data.data) {
        set({
          departmentScope: data.data.departmentScope || '',
          overview: data.data.overview || '',
          childNodes: Array.isArray(data.data.childNodes) ? data.data.childNodes : [],
          hasChanges: false,
        });
      } else {
        set({
          departmentScope: '',
          overview: '',
          childNodes: [],
          hasChanges: false,
        });
      }
    } catch {
      set({ errorMessage: 'Không thể tải dữ liệu sơ đồ tổ chức' });
    } finally {
      set({ isLoading: false });
    }
  },

  setDepartmentScope: (val: string) => {
    set({ departmentScope: val, hasChanges: true });
  },

  setOverview: (val: string) => {
    set({ overview: val, hasChanges: true });
  },

  setZoomScale: (val) => {
    set((state) => ({
      zoomScale: typeof val === 'function' ? val(state.zoomScale) : val,
    }));
  },

  togglePool: () => {
    set((state) => ({ isPoolOpen: !state.isPoolOpen }));
  },

  setIsPoolOpen: (open: boolean) => {
    set({ isPoolOpen: open });
  },

  toggleScope: () => {
    set((state) => ({ isScopeOpen: !state.isScopeOpen }));
  },

  setIsScopeOpen: (open: boolean) => {
    set({ isScopeOpen: open });
  },

  setErrorMessage: (msg: string | null) => {
    set({ errorMessage: msg });
  },

  setSuccessMessage: (msg: string | null) => {
    set({ successMessage: msg });
  },

  openEditModal: (target: EditTarget) => {
    set({ editTarget: target, isEditModalOpen: true });
  },

  closeEditModal: () => {
    set({ isEditModalOpen: false, editTarget: null });
  },

  addSquad: (initialMember?: AdminTeamMember) => {
    const { allMembers, childNodes, leaders, selectedLeaderId } = get();
    const currentLeader = leaders.find((l) => l.id === selectedLeaderId);
    const member = initialMember || allMembers[0];

    const newSquad: ChildNode = {
      id: member?.id || '',
      name: member?.name || '',
      role: member?.role || '',
      department:
        (member?.department as any) ||
        (currentLeader?.department as any) ||
        'Executive Leadership',
      location: member?.location || currentLeader?.location || 'Singapore / Global',
      image: member?.image || '',
      skills: member?.skills || [],
      responsibility: '',
      squadName: `Squad ${childNodes.length + 1}`,
      squadFocus: '',
      levelTag: 'Trưởng nhóm phụ trách / Squad Lead',
      children: [],
    };

    set({
      childNodes: [...childNodes, newSquad],
      hasChanges: true,
    });
  },

  deleteSquad: (squadIndex: number) => {
    const { childNodes } = get();
    const squad = childNodes[squadIndex];
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa "${squad?.squadName || 'Squad'}" cùng toàn bộ thành viên trực thuộc?`
      )
    ) {
      return;
    }
    set({
      childNodes: childNodes.filter((_, idx) => idx !== squadIndex),
      hasChanges: true,
    });
  },

  addSubMember: (squadIndex: number, memberToAdd?: AdminTeamMember) => {
    const { allMembers, childNodes } = get();
    const candidate =
      memberToAdd || allMembers.find((m) => m.id !== childNodes[squadIndex]?.id);
    if (!candidate) return;

    if (childNodes[squadIndex]?.children.some((c) => c.id === candidate.id)) {
      alert(`Nhân sự ${candidate.name} đã có trong Squad này`);
      return;
    }

    const newSub: SubChildNode = {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      department: candidate.department as any,
      location: candidate.location,
      image: candidate.image,
      quote: candidate.quote ?? undefined,
      skills: candidate.skills,
      responsibility: '',
      linkedin: candidate.linkedin ?? undefined,
      children: [],
    };

    const nextSquads = [...childNodes];
    nextSquads[squadIndex] = {
      ...nextSquads[squadIndex],
      children: [...nextSquads[squadIndex].children, newSub],
    };
    set({ childNodes: nextSquads, hasChanges: true });
  },

  deleteSubMember: (squadIndex: number, subIndex: number) => {
    const { childNodes } = get();
    const nextSquads = [...childNodes];
    nextSquads[squadIndex] = {
      ...nextSquads[squadIndex],
      children: nextSquads[squadIndex].children.filter((_, idx) => idx !== subIndex),
    };
    set({ childNodes: nextSquads, hasChanges: true });
  },

  addSubChild: (squadIndex: number, subIndex: number, memberToAdd?: AdminTeamMember) => {
    const { allMembers, childNodes } = get();
    const parentSub = childNodes[squadIndex]?.children[subIndex];
    if (!parentSub) return;

    const candidate =
      memberToAdd ||
      allMembers.find((m) => m.id !== parentSub.id && m.id !== childNodes[squadIndex]?.id);
    if (!candidate) return;

    const existingChildren = parentSub.children || [];
    if (existingChildren.some((c) => c.id === candidate.id)) {
      alert(`Nhân sự ${candidate.name} đã có trong nhánh này`);
      return;
    }

    const newSubChild: SubChildNode = {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      department: candidate.department as any,
      location: candidate.location,
      image: candidate.image,
      quote: candidate.quote ?? undefined,
      skills: candidate.skills,
      responsibility: '',
      linkedin: candidate.linkedin ?? undefined,
      children: [],
    };

    const nextSquads = [...childNodes];
    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: [...existingChildren, newSubChild],
    };
    set({ childNodes: nextSquads, hasChanges: true });
  },

  deleteSubChild: (squadIndex: number, subIndex: number, childIndex: number) => {
    const { childNodes } = get();
    const nextSquads = [...childNodes];
    const parentSub = nextSquads[squadIndex]?.children[subIndex];
    if (!parentSub) return;

    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: (parentSub.children || []).filter((_, idx) => idx !== childIndex),
    };
    set({ childNodes: nextSquads, hasChanges: true });
  },

  dropOnSquadLead: (squadIndex: number, droppedMember: AdminTeamMember) => {
    if (!droppedMember) return;
    const { childNodes } = get();
    const nextSquads = [...childNodes];
    const currentSquad = nextSquads[squadIndex];

    nextSquads[squadIndex] = {
      ...currentSquad,
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };

    set({
      childNodes: nextSquads,
      hasChanges: true,
      successMessage: `Đã thay thế Trưởng nhóm ${currentSquad.squadName} thành ${droppedMember.name}`,
    });
  },

  dropOnSubMember: (squadIndex: number, subIndex: number, droppedMember: AdminTeamMember) => {
    if (!droppedMember) return;
    const { childNodes } = get();
    const nextSquads = [...childNodes];
    const targetSub = nextSquads[squadIndex].children[subIndex];

    nextSquads[squadIndex].children[subIndex] = {
      ...targetSub,
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };

    set({
      childNodes: nextSquads,
      hasChanges: true,
      successMessage: `Đã thay thế vị trí nhân sự thành ${droppedMember.name}`,
    });
  },

  dropOnSubChild: (
    squadIndex: number,
    subIndex: number,
    childIndex: number,
    droppedMember: AdminTeamMember
  ) => {
    if (!droppedMember) return;
    const { childNodes } = get();
    const nextSquads = [...childNodes];
    const parentSub = nextSquads[squadIndex].children[subIndex];
    const updatedChildren = [...(parentSub.children || [])];

    updatedChildren[childIndex] = {
      ...updatedChildren[childIndex],
      id: droppedMember.id,
      name: droppedMember.name,
      role: droppedMember.role,
      department: droppedMember.department as any,
      location: droppedMember.location,
      image: droppedMember.image,
      quote: droppedMember.quote ?? undefined,
      skills: droppedMember.skills,
      linkedin: droppedMember.linkedin ?? undefined,
    };

    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: updatedChildren,
    };

    set({
      childNodes: nextSquads,
      hasChanges: true,
      successMessage: `Đã thay thế nhân sự cấp dưới thành ${droppedMember.name}`,
    });
  },

  saveLeaderModal: (newLeaderId: string) => {
    set({ selectedLeaderId: newLeaderId, hasChanges: true });
  },

  saveSquadLeadModal: (squadIndex, updatedProps, newMemberId) => {
    const { childNodes, allMembers } = get();
    const nextSquads = [...childNodes];
    let updatedLead = { ...nextSquads[squadIndex], ...updatedProps };

    if (newMemberId && newMemberId !== updatedLead.id) {
      const memberObj = allMembers.find((m) => m.id === newMemberId);
      if (memberObj) {
        updatedLead = {
          ...updatedLead,
          id: memberObj.id,
          name: memberObj.name,
          role: memberObj.role,
          department: memberObj.department as any,
          location: memberObj.location,
          image: memberObj.image,
          skills: memberObj.skills,
          linkedin: memberObj.linkedin ?? undefined,
        };
      }
    }

    nextSquads[squadIndex] = updatedLead;
    set({ childNodes: nextSquads, hasChanges: true });
  },

  saveSubMemberModal: (squadIndex, subIndex, resp, newMemberId) => {
    const { childNodes, allMembers } = get();
    const nextSquads = [...childNodes];
    let sub = { ...nextSquads[squadIndex].children[subIndex], responsibility: resp };

    if (newMemberId && newMemberId !== sub.id) {
      const memberObj = allMembers.find((m) => m.id === newMemberId);
      if (memberObj) {
        sub = {
          ...sub,
          id: memberObj.id,
          name: memberObj.name,
          role: memberObj.role,
          department: memberObj.department as any,
          location: memberObj.location,
          image: memberObj.image,
          skills: memberObj.skills,
          linkedin: memberObj.linkedin ?? undefined,
        };
      }
    }

    nextSquads[squadIndex].children[subIndex] = sub;
    set({ childNodes: nextSquads, hasChanges: true });
  },

  saveSubChildModal: (squadIndex, subIndex, childIndex, resp, newMemberId) => {
    const { childNodes, allMembers } = get();
    const nextSquads = [...childNodes];
    const parentSub = nextSquads[squadIndex].children[subIndex];
    const childrenList = [...(parentSub.children || [])];
    let childItem = { ...childrenList[childIndex], responsibility: resp };

    if (newMemberId && newMemberId !== childItem.id) {
      const memberObj = allMembers.find((m) => m.id === newMemberId);
      if (memberObj) {
        childItem = {
          ...childItem,
          id: memberObj.id,
          name: memberObj.name,
          role: memberObj.role,
          department: memberObj.department as any,
          location: memberObj.location,
          image: memberObj.image,
          skills: memberObj.skills,
          linkedin: memberObj.linkedin ?? undefined,
        };
      }
    }

    childrenList[childIndex] = childItem;
    nextSquads[squadIndex].children[subIndex] = {
      ...parentSub,
      children: childrenList,
    };
    set({ childNodes: nextSquads, hasChanges: true });
  },

  saveHierarchy: async () => {
    const { selectedLeaderId, departmentScope, overview, childNodes } = get();
    set({ errorMessage: null, successMessage: null });

    if (!selectedLeaderId) {
      set({ errorMessage: 'Vui lòng chọn Lãnh đạo cấp cao' });
      return false;
    }

    if (!departmentScope.trim()) {
      set({
        errorMessage: 'Vui lòng thiết lập Phạm vi phòng ban (Department Scope)',
        isScopeOpen: true,
      });
      return false;
    }

    if (!overview.trim()) {
      set({
        errorMessage: 'Vui lòng thiết lập Tổng quan chiến lược (Overview)',
        isScopeOpen: true,
      });
      return false;
    }

    for (let i = 0; i < childNodes.length; i++) {
      const s = childNodes[i];
      if (!s.squadName.trim()) {
        set({ errorMessage: `Squad số ${i + 1} chưa có Tên Squad` });
        return false;
      }
      if (!s.id) {
        set({ errorMessage: `Squad "${s.squadName}" chưa chọn Trưởng nhóm (Squad Lead)` });
        return false;
      }
    }

    try {
      set({ isSaving: true });
      const res = await fetch('/api/admin/people/hierarchy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaderId: selectedLeaderId,
          departmentScope: departmentScope.trim(),
          overview: overview.trim(),
          childNodes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        set({
          successMessage: 'Đã lưu thành công Sơ đồ Tổ chức & Squads!',
          hasChanges: false,
        });
        return true;
      } else {
        set({ errorMessage: data.error || 'Có lỗi xảy ra khi lưu sơ đồ' });
        return false;
      }
    } catch {
      set({ errorMessage: 'Lỗi kết nối khi lưu sơ đồ lên máy chủ' });
      return false;
    } finally {
      set({ isSaving: false });
    }
  },
}));
