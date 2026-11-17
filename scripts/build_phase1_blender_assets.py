import bpy
import bmesh
import math
import os

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "models"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    try:
        bpy.context.scene.render.engine = 'CYCLES'
    except Exception:
        pass
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat, do_unlink=True)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh, do_unlink=True)

def create_mat(name, base_color=(1,1,1,1), metallic=0.0, roughness=0.5, ior=1.45, transmission=0.0, coat=0.0, coat_roughness=0.0, emission_color=(0,0,0,1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get('Principled BSDF')
    if not bsdf:
        bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    
    if 'Base Color' in bsdf.inputs:
        bsdf.inputs['Base Color'].default_value = base_color
    if 'Metallic' in bsdf.inputs:
        bsdf.inputs['Metallic'].default_value = metallic
    if 'Roughness' in bsdf.inputs:
        bsdf.inputs['Roughness'].default_value = roughness
    if 'IOR' in bsdf.inputs:
        bsdf.inputs['IOR'].default_value = ior
    if 'Transmission Weight' in bsdf.inputs:
        bsdf.inputs['Transmission Weight'].default_value = transmission
    elif 'Transmission' in bsdf.inputs:
        bsdf.inputs['Transmission'].default_value = transmission
    if 'Coat Weight' in bsdf.inputs:
        bsdf.inputs['Coat Weight'].default_value = coat
    if 'Coat Roughness' in bsdf.inputs:
        bsdf.inputs['Coat Roughness'].default_value = coat_roughness
    if 'Emission Color' in bsdf.inputs:
        bsdf.inputs['Emission Color'].default_value = emission_color
    if 'Emission Strength' in bsdf.inputs:
        bsdf.inputs['Emission Strength'].default_value = emission_strength
    
    return mat

def export_glb(filepath):
    # Export with Draco compression, apply modifiers, export materials and normals
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_draco_position_quantization=16,
        export_draco_normal_quantization=12,
        export_draco_texcoord_quantization=12,
        export_apply=True,
        export_materials='EXPORT',
        export_normals=True
    )
    size = os.path.getsize(filepath)
    print(f"Exported {os.path.basename(filepath)} -> {size} bytes")

# =========================================================================
# ASSET 1: 01_hero_crystal_cluster.glb
# =========================================================================
def build_hero_crystal_cluster():
    clear_scene()
    print("Building 01_hero_crystal_cluster.glb...")
    
    # 1. Root Empty
    root_empty = bpy.data.objects.new("HeroCluster_Root", None)
    bpy.context.collection.objects.link(root_empty)

    # 2. Materials
    # Mat_DeepCobaltGlass: Base Color = (0.02, 0.08, 0.25, 1.0), Metallic = 0.15, Roughness = 0.12, IOR = 1.52, Transmission Weight = 0.85, Coat Weight = 1.0, Coat Roughness = 0.05
    mat_glass = create_mat(
        "Mat_DeepCobaltGlass",
        base_color=(0.02, 0.08, 0.25, 1.0),
        metallic=0.15,
        roughness=0.12,
        ior=1.52,
        transmission=0.85,
        coat=1.0,
        coat_roughness=0.05,
        emission_color=(0.02, 0.05, 0.15, 1.0),
        emission_strength=0.2
    )

    # Mat_CyanNeonCore: Base Color = (0.35, 0.75, 1.0, 1.0), Emission Color = (0.25, 0.65, 1.0, 1.0), Emission Strength = 6.0
    mat_neon = create_mat(
        "Mat_CyanNeonCore",
        base_color=(0.35, 0.75, 1.0, 1.0),
        metallic=0.05,
        roughness=0.08,
        ior=1.45,
        transmission=0.15,
        emission_color=(0.25, 0.65, 1.0, 1.0),
        emission_strength=6.0
    )

    cube_size = 1.0
    gap = 0.08
    step = cube_size + gap # 1.08
    cube_index = 1

    # 3x3x3 grid centered
    for x in (-1, 0, 1):
        for y in (-1, 0, 1):
            for z in (-1, 0, 1):
                loc = (x * step, y * step, z * step)
                bpy.ops.mesh.primitive_cube_add(size=cube_size, location=loc)
                cube = bpy.context.active_object
                cube.name = f"HeroCube_{cube_index:02d}"

                # Shade Smooth
                bpy.ops.object.shade_smooth()

                # Bevel modifier: width = 0.045, segments = 4
                bev = cube.modifiers.new(name="Bevel", type='BEVEL')
                bev.width = 0.045
                bev.segments = 4
                bev.profile = 0.5
                bpy.context.view_layer.objects.active = cube
                bpy.ops.object.modifier_apply(modifier="Bevel")

                # Set origin to geometry center
                bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

                # Materials slots
                cube.data.materials.append(mat_glass)
                cube.data.materials.append(mat_neon)

                # Core cube or top-facing plates
                is_center = (x == 0 and y == 0 and z == 0)
                is_top_center = (x == 0 and y == 0 and z == 1)

                if is_center or is_top_center:
                    for poly in cube.data.polygons:
                        poly.material_index = 1 # Neon Core
                else:
                    for poly in cube.data.polygons:
                        # Top-facing chamfered plates get neon glow if upper layer
                        if z >= 0 and poly.normal.z > 0.75:
                            poly.material_index = 1
                        else:
                            poly.material_index = 0

                # Parent to root empty
                cube.parent = root_empty
                cube_index += 1

    # 3. Inner glowing core mesh inside center 3x3 cubes (scale = 0.85)
    for ix in (-1, 0, 1):
        for iy in (-1, 0, 1):
            # Inner core for central slab
            loc = (ix * step * 0.9, iy * step * 0.9, 0)
            bpy.ops.mesh.primitive_cube_add(size=0.85, location=loc)
            core_cube = bpy.context.active_object
            core_cube.name = f"InnerCore_{ix+2}_{iy+2}"
            bpy.ops.object.shade_smooth()

            bev = core_cube.modifiers.new(name="Bevel", type='BEVEL')
            bev.width = 0.03
            bev.segments = 3
            bpy.context.view_layer.objects.active = core_cube
            bpy.ops.object.modifier_apply(modifier="Bevel")

            core_cube.data.materials.append(mat_neon)
            core_cube.parent = root_empty

    out_path = os.path.join(OUTPUT_DIR, "01_hero_crystal_cluster.glb")
    export_glb(out_path)

# =========================================================================
# ASSET 2: 02_warp_hex_crystals.glb
# =========================================================================
def build_warp_hex_crystals():
    clear_scene()
    print("Building 02_warp_hex_crystals.glb...")

    root_empty = bpy.data.objects.new("WarpTunnel_Root", None)
    bpy.context.collection.objects.link(root_empty)

    # Materials
    # Mat_CrystalIce: Translucent ice-blue glass (Transmission = 0.9, Roughness = 0.08, Emission Strength = 1.2 in #93c5fd)
    mat_crystal = create_mat(
        "Mat_CrystalIce",
        base_color=(147/255, 197/255, 253/255, 1.0),
        metallic=0.08,
        roughness=0.08,
        ior=1.55,
        transmission=0.90,
        coat=1.0,
        coat_roughness=0.04,
        emission_color=(147/255, 197/255, 253/255, 1.0),
        emission_strength=1.2
    )

    # Mat_StreakBeam: Pure bright cyan emission (#60a5fa, Emission Strength = 8.0)
    mat_streak = create_mat(
        "Mat_StreakBeam",
        base_color=(96/255, 165/255, 250/255, 1.0),
        roughness=0.05,
        emission_color=(96/255, 165/255, 250/255, 1.0),
        emission_strength=8.0
    )

    # 1. 12 varied elongated hexagonal crystal shards arranged in radial tunnel ring (radius = 4.0 to 7.0)
    # Leaving center clear for camera flight path
    shard_configs = [
        {"radius": 0.45, "depth": 5.2, "ring_r": 4.8, "angle": 0.0, "z_off": -4.0, "tilt": (0.15, 0.08, 0.0)},
        {"radius": 0.60, "depth": 6.8, "ring_r": 5.6, "angle": math.pi * 0.17, "z_off": 2.0, "tilt": (-0.12, 0.15, 0.1)},
        {"radius": 0.38, "depth": 4.6, "ring_r": 4.3, "angle": math.pi * 0.33, "z_off": -6.0, "tilt": (0.05, -0.18, 0.0)},
        {"radius": 0.55, "depth": 6.2, "ring_r": 6.4, "angle": math.pi * 0.50, "z_off": 0.0, "tilt": (-0.15, -0.10, 0.12)},
        {"radius": 0.48, "depth": 5.5, "ring_r": 5.0, "angle": math.pi * 0.67, "z_off": -3.0, "tilt": (0.18, -0.05, 0.0)},
        {"radius": 0.65, "depth": 7.2, "ring_r": 6.8, "angle": math.pi * 0.83, "z_off": 3.5, "tilt": (-0.08, 0.16, -0.1)},
        {"radius": 0.40, "depth": 4.8, "ring_r": 4.5, "angle": math.pi * 1.00, "z_off": -5.0, "tilt": (0.10, 0.12, 0.0)},
        {"radius": 0.52, "depth": 6.0, "ring_r": 5.8, "angle": math.pi * 1.17, "z_off": 1.0, "tilt": (-0.14, -0.12, 0.08)},
        {"radius": 0.42, "depth": 5.0, "ring_r": 4.6, "angle": math.pi * 1.33, "z_off": -2.0, "tilt": (0.08, 0.14, -0.05)},
        {"radius": 0.58, "depth": 6.5, "ring_r": 6.0, "angle": math.pi * 1.50, "z_off": 4.0, "tilt": (-0.10, -0.08, 0.15)},
        {"radius": 0.46, "depth": 5.4, "ring_r": 5.2, "angle": math.pi * 1.67, "z_off": -4.5, "tilt": (0.12, -0.10, 0.0)},
        {"radius": 0.62, "depth": 7.0, "ring_r": 6.6, "angle": math.pi * 1.83, "z_off": 2.5, "tilt": (-0.06, 0.18, -0.12)},
    ]

    for i, cfg in enumerate(shard_configs):
        x = math.cos(cfg["angle"]) * cfg["ring_r"]
        y = math.sin(cfg["angle"]) * cfg["ring_r"]
        z = cfg["z_off"]

        bpy.ops.mesh.primitive_cylinder_add(
            vertices=6,
            radius=cfg["radius"],
            depth=cfg["depth"],
            location=(x, y, z),
            rotation=cfg["tilt"]
        )
        obj = bpy.context.active_object
        obj.name = f"WarpShard_{i+1:02d}"

        # Taper ends into crystal facets using bmesh
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        z_coords = [v.co.z for v in bm.verts]
        max_z = max(z_coords)
        min_z = min(z_coords)
        tip_h = (max_z - min_z) * 0.22

        for v in bm.verts:
            if v.co.z > max_z - tip_h:
                factor = (max_z - v.co.z) / tip_h
                v.co.x *= (0.15 + 0.85 * factor)
                v.co.y *= (0.15 + 0.85 * factor)
            elif v.co.z < min_z + tip_h:
                factor = (v.co.z - min_z) / tip_h
                v.co.x *= (0.15 + 0.85 * factor)
                v.co.y *= (0.15 + 0.85 * factor)
        bm.to_mesh(obj.data)
        bm.free()

        bpy.ops.object.shade_smooth()
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = 0.04
        bev.segments = 4
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier="Bevel")

        obj.data.materials.append(mat_crystal)
        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
        obj.parent = root_empty

    # 2. 32 thin elongated light-streak needles (scale = 0.015, 0.015, 6.0)
    for i in range(32):
        angle = (i / 32.0) * math.pi * 2.0 + (i % 2) * 0.15
        ring_r = 3.8 + (i % 5) * 0.8
        x = math.cos(angle) * ring_r
        y = math.sin(angle) * ring_r
        z = ((i % 8) - 4) * 3.0

        bpy.ops.mesh.primitive_cylinder_add(
            vertices=12,
            radius=0.035,
            depth=6.0,
            location=(x, y, z),
            rotation=(0, 0, 0)
        )
        streak = bpy.context.active_object
        streak.name = f"StreakNeedle_{i+1:02d}"
        bpy.ops.object.shade_smooth()
        streak.data.materials.append(mat_streak)
        streak.parent = root_empty

    out_path = os.path.join(OUTPUT_DIR, "02_warp_hex_crystals.glb")
    export_glb(out_path)

# =========================================================================
# ASSET 3: 03_isometric_settlement_grid.glb
# =========================================================================
def build_isometric_settlement_grid():
    clear_scene()
    print("Building 03_isometric_settlement_grid.glb...")

    root_empty = bpy.data.objects.new("GridPlatform_Root", None)
    bpy.context.collection.objects.link(root_empty)

    # Materials
    # Mat_ObsidianMetal: Base Color = (0.03, 0.05, 0.1, 1.0), Metallic = 0.92, Roughness = 0.28
    mat_obsidian = create_mat(
        "Mat_ObsidianMetal",
        base_color=(0.03, 0.05, 0.1, 1.0),
        metallic=0.92,
        roughness=0.28,
        coat=0.6,
        coat_roughness=0.15
    )

    # Mat_WhiteIceGlow: Base Color = (0.85, 0.95, 1.0, 1.0), Emission Color = (0.55, 0.85, 1.0, 1.0), Emission Strength = 4.5
    mat_glow = create_mat(
        "Mat_WhiteIceGlow",
        base_color=(0.85, 0.95, 1.0, 1.0),
        metallic=0.1,
        roughness=0.15,
        emission_color=(0.55, 0.85, 1.0, 1.0),
        emission_strength=4.5
    )

    # Mat_SubtleCap: For non-cross tiles top cap
    mat_subtle_cap = create_mat(
        "Mat_SubtleDarkCap",
        base_color=(0.06, 0.10, 0.20, 1.0),
        metallic=0.85,
        roughness=0.25,
        emission_color=(0.15, 0.35, 0.70, 1.0),
        emission_strength=0.8
    )

    tile_w = 1.4
    tile_h = 0.35
    gap = 0.12
    step = tile_w + gap # 1.52

    # Center cross tiles: indices 7, 11, 12, 13, 14, 18 (1-based)
    glowing_indices = {7, 11, 12, 13, 14, 18}

    tile_num = 1
    for r in range(5):
        for c in range(5):
            x = (c - 2) * step
            y = (r - 2) * step

            # 1. Base Tile: BaseTile_01 to BaseTile_25
            bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x, y, 0))
            base = bpy.context.active_object
            base.name = f"BaseTile_{tile_num:02d}"
            base.dimensions = (tile_w, tile_w, tile_h)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.shade_smooth()

            bev = base.modifiers.new(name="Bevel", type='BEVEL')
            bev.width = 0.06
            bev.segments = 4
            bpy.context.view_layer.objects.active = base
            bpy.ops.object.modifier_apply(modifier="Bevel")
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

            base.data.materials.append(mat_obsidian)
            base.parent = root_empty

            # 2. Top Cap: TopCap_01 to TopCap_25
            cap_w = tile_w - 0.08
            cap_h = 0.06
            cap_z = (tile_h / 2.0) + (cap_h / 2.0) - 0.01

            bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x, y, cap_z))
            cap = bpy.context.active_object
            cap.name = f"TopCap_{tile_num:02d}"
            cap.dimensions = (cap_w, cap_w, cap_h)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.shade_smooth()

            bev_cap = cap.modifiers.new(name="Bevel", type='BEVEL')
            bev_cap.width = 0.03
            bev_cap.segments = 4
            bpy.context.view_layer.objects.active = cap
            bpy.ops.object.modifier_apply(modifier="Bevel")
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

            if tile_num in glowing_indices:
                cap.data.materials.append(mat_glow)
            else:
                cap.data.materials.append(mat_subtle_cap)

            cap.parent = root_empty
            tile_num += 1

    out_path = os.path.join(OUTPUT_DIR, "03_isometric_settlement_grid.glb")
    export_glb(out_path)

# =========================================================================
# ASSET 4: 04_eclipse_portal_ring.glb
# =========================================================================
def build_eclipse_portal_ring():
    clear_scene()
    print("Building 04_eclipse_portal_ring.glb...")

    root_empty = bpy.data.objects.new("EclipsePortal_Root", None)
    bpy.context.collection.objects.link(root_empty)

    # Materials
    # Mat_VoidCore: Pitch black (Base Color = (0.005, 0.008, 0.015, 1.0), Roughness = 0.95)
    mat_void = create_mat(
        "Mat_VoidCore",
        base_color=(0.005, 0.008, 0.015, 1.0),
        metallic=0.0,
        roughness=0.95
    )

    # Mat_CoronaRim: Intense electric blue-white glow (Emission Color = (0.2, 0.6, 1.0, 1.0), Emission Strength = 7.5)
    mat_corona = create_mat(
        "Mat_CoronaRim",
        base_color=(0.2, 0.6, 1.0, 1.0),
        roughness=0.1,
        emission_color=(0.2, 0.6, 1.0, 1.0),
        emission_strength=7.5
    )

    # Mat_AtmosphericHalo: Soft atmospheric outer falloff
    mat_halo = create_mat(
        "Mat_AtmosphericHalo",
        base_color=(0.1, 0.4, 0.9, 1.0),
        roughness=0.2,
        emission_color=(0.12, 0.45, 0.95, 1.0),
        emission_strength=3.5
    )

    # 1. High-resolution torus ring (major_radius = 3.2, minor_radius = 0.06, major_segments = 128)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=3.2,
        minor_radius=0.06,
        major_segments=128,
        minor_segments=32,
        location=(0, 0, 0.05)
    )
    torus = bpy.context.active_object
    torus.name = "Eclipse_TorusRing"
    bpy.ops.object.shade_smooth()
    torus.data.materials.append(mat_corona)
    torus.parent = root_empty

    # 2. Solid matte-black inner disc (radius = 3.18)
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=96,
        radius=3.18,
        depth=0.08,
        location=(0, 0, 0.0)
    )
    disc = bpy.context.active_object
    disc.name = "Eclipse_VoidDisc"
    bpy.ops.object.shade_smooth()
    bev_disc = disc.modifiers.new(name="Bevel", type='BEVEL')
    bev_disc.width = 0.02
    bev_disc.segments = 3
    bpy.context.view_layer.objects.active = disc
    bpy.ops.object.modifier_apply(modifier="Bevel")
    disc.data.materials.append(mat_void)
    disc.parent = root_empty

    # 3. Outer atmospheric halo ring (minor_radius = 0.22) with soft falloff
    bpy.ops.mesh.primitive_torus_add(
        major_radius=3.24,
        minor_radius=0.22,
        major_segments=128,
        minor_segments=32,
        location=(0, 0, -0.05)
    )
    halo = bpy.context.active_object
    halo.name = "Eclipse_HaloRing"
    bpy.ops.object.shade_smooth()
    halo.data.materials.append(mat_halo)
    halo.parent = root_empty

    out_path = os.path.join(OUTPUT_DIR, "04_eclipse_portal_ring.glb")
    export_glb(out_path)

if __name__ == "__main__":
    build_hero_crystal_cluster()
    build_warp_hex_crystals()
    build_isometric_settlement_grid()
    build_eclipse_portal_ring()
    print("ALL 4 HIGH-DETAIL GLB ASSETS GENERATED!")
