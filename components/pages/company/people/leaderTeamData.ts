import { TeamMember, allExperts, leadershipTeam } from './peopleData';

export type SubChildNode = {
  id: string;
  name: string;
  role: string;
  department: TeamMember['department'];
  location: string;
  image: string;
  quote?: string;
  skills: string[];
  responsibility: string;
  linkedin?: string;
  children?: SubChildNode[];
};

export type ChildNode = {
  id: string;
  name: string;
  role: string;
  department: TeamMember['department'];
  location: string;
  image: string;
  quote?: string;
  skills: string[];
  responsibility: string;
  linkedin?: string;
  squadName: string;
  squadFocus: string;
  levelTag: string; // e.g., "Squad Lead"
  children: SubChildNode[]; // Child nodes (Grid view)
};

export type LeaderTeamHierarchy = {
  leaderId: string;
  departmentScope: string;
  overview: string;
  childNodes: ChildNode[]; // Level 2 child nodes
};

function findMember(id: string): TeamMember | undefined {
  return (
    leadershipTeam.find((l) => l.id === id) || allExperts.find((e) => e.id === id)
  );
}

function createSubChild(id: string, responsibility: string): SubChildNode | null {
  const m = findMember(id);
  if (!m) return null;
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    department: m.department,
    location: m.location,
    image: m.image,
    quote: m.quote,
    skills: m.skills,
    responsibility,
    linkedin: m.linkedin,
  };
}

function createChildNode(
  id: string,
  squadName: string,
  squadFocus: string,
  levelTag: string,
  responsibility: string,
  children: (SubChildNode | null)[]
): ChildNode | null {
  const m = findMember(id);
  if (!m) return null;
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    department: m.department,
    location: m.location,
    image: m.image,
    quote: m.quote,
    skills: m.skills,
    responsibility,
    linkedin: m.linkedin,
    squadName,
    squadFocus,
    levelTag,
    children: children.filter(Boolean) as SubChildNode[],
  };
}

export const leaderHierarchies: Record<string, LeaderTeamHierarchy> = {
  // Leader 1: Suhas Hiwale - CEO
  'lead-1': {
    leaderId: 'lead-1',
    departmentScope: 'Global Executive Governance & Cross-Border Commerce Architecture',
    overview:
      'Directs the Global Executive Leadership Team, overseeing core strategic markets across Singapore, Japan, the United States, India, and Vietnam.',
    childNodes: [
      createChildNode(
        'lead-2',
        'Japan Regional Commercial Branch',
        'Japan Market & Manufacturing Alliances',
        'Sub-node: Country Manager Japan',
        'Directs commercial expansion in Japan and drives alliances with top manufacturing conglomerates.',
        [
          createSubChild('exp-2', 'Advises on enterprise agreements and regional retail expansion across Japan.'),
          createSubChild('exp-3', 'Oversees key account management, GMV optimization, and strict SLA delivery.'),
          createSubChild('exp-7', 'Solutions architect for omnichannel retail solutions based in Tokyo.'),
          createSubChild('exp-5', 'Delivery director overseeing technical quality and project delivery in Japan.'),
        ]
      )!,
      createChildNode(
        'lead-4',
        'Presales & Technical Architecture Branch',
        'Digital Solutions Architecture & Technical Due Diligence',
        'Sub-node: Senior Director of Architecture',
        'Governs technical quality and complex system integration architecture across 100+ global deployments.',
        [
          createSubChild('exp-1', 'Leads zero-downtime cloud infrastructure and distributed microservices architecture.'),
          createSubChild('exp-4', 'Specializes in product catalog data models, checkout workflows, and dynamic payment orchestration.'),
          createSubChild('exp-11', 'Designs multi-channel synchronization rules and automated net profit reconciliation.'),
          createSubChild('exp-18', 'Real-time landed cost analysis and gross margin predictive modeling.'),
        ]
      )!,
      createChildNode(
        'lead-7',
        'Product Engineering & AI Branch',
        'Core Technology Products & Automated WMS',
        'Sub-node: Senior Director of Products',
        'Drives the proprietary product roadmap, AI address parsing technology, and warehouse fulfillment synchronization.',
        [
          createSubChild('exp-6', 'Engineering lead for omnichannel inventory synchronization and real-time message queuing.'),
          createSubChild('exp-15', 'AI engineer developing automated address parsing models with 99.9% accuracy.'),
          createSubChild('exp-13', 'Directs US large-format print fulfillment facilities with sub-24h turnaround.'),
          createSubChild('exp-16', 'Ensures strict compliance with TikTok Shop US marketplace policies and risk mitigation.'),
        ]
      )!,
      createChildNode(
        'lead-5',
        'Global Agile Delivery & Operations Branch',
        'Multinational Project Delivery & Engineering Culture',
        'Sub-node: Associate Delivery Director',
        'Oversees distributed multinational Agile delivery cycles, guaranteeing stringent SLA commitments.',
        [
          createSubChild('exp-8', 'Scrum lead tracking sprint velocity and milestone commitments with zero variance.'),
          createSubChild('exp-9', 'Coordinates global engineering teams and multi-tier integration testing.'),
          createSubChild('exp-10', 'Manages enterprise platform migrations and 24/7 hypercare support.'),
          createSubChild('exp-14', 'Directs performance media campaigns achieving 4.8x ROAS and growth funnel optimization.'),
        ]
      )!,
    ],
  },

  // Leader 2: Osamu Kamiya - Country Manager Japan
  'lead-2': {
    leaderId: 'lead-2',
    departmentScope: 'Japan Regional Commerce & Enterprise Account Advisory',
    overview:
      'Leads Tokyo business development, presales solutioning, and enterprise client relations, connecting Japanese manufacturers with global markets.',
    childNodes: [
      createChildNode(
        'exp-2',
        'Commercial Solutions & Merchant Advisory',
        'Enterprise Contracting & Retailer Onboarding',
        'Sub-node: Commercial Lead',
        'Advises Japanese enterprise clients, integrating POD supply chains and global marketplaces.',
        [
          createSubChild('exp-3', 'Manages enterprise accounts and maximizes GMV throughput for Japanese merchants.'),
          createSubChild('exp-12', 'Advises on APAC-standard cross-border commerce workflows.'),
        ]
      )!,
      createChildNode(
        'exp-7',
        'Architecture Blueprinting & Pre-Sales',
        'System Architecture Design & Infrastructure Due Diligence',
        'Sub-node: Solutions Architect Lead',
        'Presales solutions architect assessing omnichannel retail technology infrastructure for the Japanese market.',
        [
          createSubChild('exp-5', 'Orchestrates engineering sprint velocity and software quality assurance in Japan.'),
          createSubChild('exp-4', 'Specialist in multi-language product catalogs and localized checkout experiences.'),
        ]
      )!,
    ],
  },

  // Leader 3: Kenneth Kong - Head of Global Partnerships
  'lead-3': {
    leaderId: 'lead-3',
    departmentScope: 'Global Strategic Alliances, Marketplace Ecosystems & Channel Scaling',
    overview:
      'Establishes and expands strategic alliances with top global commerce platforms (TikTok Shop US, Amazon FBM, Shopify Plus, SAP).',
    childNodes: [
      createChildNode(
        'exp-16',
        'Marketplace Compliance & Governance',
        'International Marketplace Policy & Warehouse Operations',
        'Sub-node: Compliance Director',
        'Enforces strict compliance with TikTok Shop US and Amazon FBM policies while safeguarding merchant reputation.',
        [
          createSubChild('exp-13', 'Manages print facilities and dispatches POD orders to meet marketplace SLAs.'),
          createSubChild('exp-14', 'Designs high-performance promotional campaigns aligned with marketplace guidelines.'),
        ]
      )!,
      createChildNode(
        'exp-12',
        'Strategic Ecosystem Architecture',
        'Partner Platform Alliances & Market Expansion',
        'Sub-node: Ecosystem Architect',
        'Advises on modular commerce architectures linking distribution channels across APAC and Oceania.',
        [
          createSubChild('exp-2', 'Connects brand partners to omnichannel sales ecosystems.'),
          createSubChild('exp-11', 'Architects order data pipelines between external partners and core platform systems.'),
        ]
      )!,
    ],
  },

  // Leader 4: Manjula Mariswamy - Senior Director - Presales & Project Excellence
  'lead-4': {
    leaderId: 'lead-4',
    departmentScope: 'Presales Solution Architecture, Governance & Technical Excellence',
    overview:
      'Directs technical presales consulting, complex integration architectures, and quality benchmark governance for digital commerce projects.',
    childNodes: [
      createChildNode(
        'exp-1',
        'Cloud Infrastructure & Technical Governance',
        'Microservices Infrastructure & Distributed Cloud Computing',
        'Sub-node: Technology Director',
        'Defines distributed cloud architecture standards, ensuring 99.99% system uptime.',
        [
          createSubChild('exp-6', 'Leads fullstack architecture execution and real-time worker infrastructure.'),
          createSubChild('exp-15', 'Principal engineer developing AI data pipelines and core webhook integrations.'),
        ]
      )!,
      createChildNode(
        'exp-4',
        'Commerce Solutions & Business Logic',
        'Commerce Business Rules & Automated Reconciliation',
        'Sub-node: Solutions Practice Lead',
        'Expert in product catalog structures, dynamic checkout workflows, and deep ERP integrations.',
        [
          createSubChild('exp-7', 'Architect conducting technical feasibility assessments and solution design.'),
          createSubChild('exp-11', 'Designs financial reconciliation logic and multi-channel order synchronization.'),
          createSubChild('exp-18', 'Models shipping cost calculations and analyzes real-time landed cost metrics.'),
        ]
      )!,
    ],
  },

  // Leader 5: Meetu Sharma - Associate Delivery Director
  'lead-5': {
    leaderId: 'lead-5',
    departmentScope: 'Global Agile Delivery, Cross-Border Sprint Execution & SLA Governance',
    overview:
      'Manages distributed multinational Agile engineering teams, guaranteeing on-time sprint milestones and rigorous SLA adherence.',
    childNodes: [
      createChildNode(
        'exp-5',
        'Regional Implementation & Risk Management',
        'Regional Project Delivery & Risk Mitigation',
        'Sub-node: Senior Delivery Manager',
        'Oversees delivery quality and risk mitigation for multi-language development squads.',
        [
          createSubChild('exp-3', 'Monitors client SLA metrics and rapidly resolves delivery roadblocks.'),
          createSubChild('exp-12', 'Supports technical specifications and cross-border engineering communication.'),
        ]
      )!,
      createChildNode(
        'exp-8',
        'Agile Sprint Release & Hypercare',
        'Scrum Velocity, Continuous Deployment & 24/7 Monitoring',
        'Sub-node: Senior Project Manager',
        'Scrum master tracking milestone deadlines and ensuring predictable sprint delivery.',
        [
          createSubChild('exp-9', 'Coordinates automated CI/CD release pipelines and user acceptance testing.'),
          createSubChild('exp-10', 'Leads major system cutovers and coordinates 24/7 on-call incident response.'),
          createSubChild('exp-6', 'Provides advanced sprint engineering support and immediate performance tuning.'),
        ]
      )!,
    ],
  },

  // Leader 6: Kevin Frot - Executive CX Director
  'lead-6': {
    leaderId: 'lead-6',
    departmentScope: 'Customer Experience Strategy, Storefront UI/UX & High-Converting Journeys',
    overview:
      'Leads premium digital experience strategy, crafting high-converting shopping journeys and modern storefront interfaces for Western consumers.',
    childNodes: [
      createChildNode(
        'exp-17',
        'Headless Storefront & UX Architecture',
        'High-Performance UI, Micro-Interactions & Core Web Vitals',
        'Sub-node: UI/UX Architect Lead',
        'Architects ultra-fast headless storefronts using Next.js and Tailwind, elevating shopper engagement.',
        [
          createSubChild('exp-6', 'Fullstack engineer optimizing client-side and server-side rendering performance.'),
          createSubChild('exp-11', 'Streamlines checkout steps to significantly minimize cart abandonment.'),
        ]
      )!,
      createChildNode(
        'exp-14',
        'Conversion Rate & Performance Media',
        'Conversion Marketing & Growth Funnels',
        'Sub-node: Growth & Media Lead',
        'Designs high-converting ad funnels, runs landing page A/B tests, and optimizes customer acquisition costs.',
        [
          createSubChild('exp-16', 'Ensures advertising creative adheres to platform community standards.'),
          createSubChild('exp-2', 'Collaborates on brand messaging tailored to target geographic markets.'),
        ]
      )!,
    ],
  },

  // Leader 7: Sudip Saha - Senior Director of Products
  'lead-7': {
    leaderId: 'lead-7',
    departmentScope: 'Proprietary Automation Modules, AI Address Cleaners & WMS Infrastructure',
    overview:
      'Directs proprietary product development, including AI-driven address normalization, intelligent order routing, and fulfillment infrastructure.',
    childNodes: [
      createChildNode(
        'exp-6',
        'Automation Engine & Distributed Services',
        'Multi-Marketplace Synchronization, Message Queues & Core APIs',
        'Sub-node: Practice Lead',
        'Engineers real-time omnichannel inventory synchronization engines and high-volume batch processors.',
        [
          createSubChild('exp-15', 'AI engineer developing high-precision automatic address normalization algorithms.'),
          createSubChild('exp-1', 'Cloud infrastructure advisor ensuring seamless, uninterrupted auto-scaling.'),
        ]
      )!,
      createChildNode(
        'exp-13',
        'Smart Warehouse & Rapid Fulfillment',
        'Smart Warehousing, 24h POD Printing & Barcode Tracking',
        'Sub-node: Operations Lead',
        'Directs US large-format print networks, barcode verification workflows, and sub-24h POD dispatch.',
        [
          createSubChild('exp-16', 'Guarantees order processing compliance with carrier and marketplace shipping standards.'),
          createSubChild('exp-18', 'Monitors real-time inventory levels, analyzes shipping costs, and flags fulfillment anomalies.'),
        ]
      )!,
    ],
  },

  // Leader 8: Thao Tran - Head of Human Resources
  'lead-8': {
    leaderId: 'lead-8',
    departmentScope: 'Global Talent Acquisition, Culture Building & Engineering Mentorship',
    overview:
      'Champions global talent development, fosters a culture of innovation and ownership, and mentors elite engineering teams.',
    childNodes: [
      createChildNode(
        'exp-8',
        'Agile Culture & Team Engagement',
        'Agile Culture, Team Synergy & Professional Growth',
        'Sub-node: Culture & Scrum Lead',
        'Facilitates Agile enablement workshops and fosters an energizing, collaborative environment.',
        [
          createSubChild('exp-9', 'Coordinates team-building and engagement initiatives across international offices.'),
          createSubChild('exp-3', 'Serves as an HR liaison actively gathering feedback from Japan regional teams.'),
        ]
      )!,
      createChildNode(
        'exp-6',
        'Technical Mentorship & Capability Building',
        'Engineering Excellence, In-Depth Training & Code Standards',
        'Sub-node: Mentorship Lead',
        'Leads technical mentorship programs, training upcoming engineering cohorts on enterprise best practices.',
        [
          createSubChild('exp-13', 'Coordinates safety standards and operational training for POD fulfillment centers.'),
          createSubChild('exp-15', 'Hosts technical deep-dives on applied AI and backend system automation.'),
        ]
      )!,
    ],
  },
};
