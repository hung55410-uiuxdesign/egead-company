import bpy
import bmesh
import math
import os

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "models"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

def setup_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    try:
        bpy.context.scene.render.engine = 'CYCLES'
    except Exception:
        pass

    # World background pure pitch black #000000
    world = bpy.context.scene.world
    if not world:
        world = bpy.data.worlds.new("World")
        bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs['Color'].default_value = (0.0, 0.0, 0.0, 1.0)
        bg.inputs['Strength'].default_value = 0.0

    # Key Light: Area Light (500W, color #e0f2fe, position [6, 6, 9])
    key_data = bpy.data.lights.new(name="Key_Area_Light", type='AREA')
    key_data.energy = 500
    key_data.color = (224/255, 242/255, 254/255)
    key_data.size = 2.5
    key_obj = bpy.data.objects.new("Key_Area_Light", key_data)
    key_obj.location = (6.0, 6.0, 9.0)
    bpy.context.collection.objects.link(key_obj)

    # Rim/Back Light: Spot Light (900W, color #3b82f6, position [-7, -5, 4])
    rim_data = bpy.data.lights.new(name="Rim_Spot_Light", type='SPOT')
    rim_data.energy = 900
    rim_data.color = (59/255, 130/255, 246/255)
    rim_data.spot_size = 0.85
    rim_data.spot_blend = 0.25
    rim_obj = bpy.data.objects.new("Rim_Spot_Light", rim_data)
    rim_obj.location = (-7.0, -5.0, 4.0)
    bpy.context.collection.objects.link(rim_obj)

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
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_draco_position_quantization=16,
        export_draco_normal_quantization=12,
        export_draco_texcoord_quantization=12,
        export_apply=True,
        export_materials='EXPORT',
        export_normals=True,
        export_lights=True
    )
    size = os.path.getsize(filepath)
    print(f"Exported {os.path.basename(filepath)} -> {size} bytes")

# =========================================================================
# 1. MODEL 1: hero_cube_cluster.glb
# =========================================================================
def build_hero_cube_cluster():
    setup_scene()
    print("Building hero_cube_cluster.glb...")

    root = bpy.data.objects.new("HeroRoot", None)
    bpy.context.collection.objects.link(root)

    # Mat_CobaltGlass: Deep Navy #050b1f, Metallic = 0.1, Roughness = 0.07, IOR = 1.48, Transmission = 0.88, Coat = 1.0, Coat Roughness = 0.04
    mat_glass = create_mat(
        "Mat_CobaltGlass",
        base_color=(5/255, 11/255, 31/255, 1.0),
        metallic=0.1,
        roughness=0.07,
        ior=1.48,
        transmission=0.88,
        coat=1.0,
        coat_roughness=0.04,
        emission_color=(10/255, 25/255, 65/255, 1.0),
        emission_strength=0.25
    )

    # Mat_CyanEmission: Base Color = #38bdf8, Emission Color = #38bdf8, Emission Strength = 6.0
    mat_cyan_emission = create_mat(
        "Mat_CyanEmission",
        base_color=(56/255, 189/255, 248/255, 1.0),
        metallic=0.05,
        roughness=0.08,
        ior=1.45,
        transmission=0.1,
        emission_color=(56/255, 189/255, 248/255, 1.0),
        emission_strength=6.0
    )

    cube_size = 1.0
    gap = 0.08
    step = cube_size + gap # 1.08
    idx = 1

    # 3x3x3 cluster of 27 cubes
    for x in (-1, 0, 1):
        for y in (-1, 0, 1):
            for z in (-1, 0, 1):
                loc = (x * step, y * step, z * step)
                bpy.ops.mesh.primitive_cube_add(size=cube_size, location=loc)
                cube = bpy.context.active_object
                cube.name = f"Cube_{idx:02d}"

                bpy.ops.object.shade_smooth()

                # Bevel modifier: width = 0.045, segments = 4, clamp overlap = True
                bev = cube.modifiers.new(name="Bevel", type='BEVEL')
                bev.width = 0.045
                bev.segments = 4
                bev.use_clamp_overlap = True
                bpy.context.view_layer.objects.active = cube
                bpy.ops.object.modifier_apply(modifier="Bevel")

                bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

                cube.data.materials.append(mat_glass)
                cube.data.materials.append(mat_cyan_emission)

                is_core = (x == 0 and y == 0 and z == 0)
                is_top_center = (x == 0 and y == 0 and z == 1)

                if is_core or is_top_center:
                    for poly in cube.data.polygons:
                        poly.material_index = 1
                else:
                    for poly in cube.data.polygons:
                        if z >= 0 and poly.normal.z > 0.75:
                            poly.material_index = 1
                        else:
                            poly.material_index = 0

                cube.parent = root
                idx += 1

    # Inner glowing core cubes inside center of cluster (scale = 0.8)
    for ix in (-1, 0, 1):
        for iy in (-1, 0, 1):
            loc = (ix * step * 0.85, iy * step * 0.85, 0)
            bpy.ops.mesh.primitive_cube_add(size=0.8, location=loc)
            core = bpy.context.active_object
            core.name = f"InnerCore_{ix+2}_{iy+2}"
            bpy.ops.object.shade_smooth()
            bev_c = core.modifiers.new(name="Bevel", type='BEVEL')
            bev_c.width = 0.035
            bev_c.segments = 3
            bev_c.use_clamp_overlap = True
            bpy.context.view_layer.objects.active = core
            bpy.ops.object.modifier_apply(modifier="Bevel")

            core.data.materials.append(mat_cyan_emission)
            core.parent = root

    out_path = os.path.join(OUTPUT_DIR, "hero_cube_cluster.glb")
    export_glb(out_path)

# =========================================================================
# 2. MODEL 2: warp_tunnel_shards.glb
# =========================================================================
def build_warp_tunnel_shards():
    setup_scene()
    print("Building warp_tunnel_shards.glb...")

    root = bpy.data.objects.new("WarpTunnelRoot", None)
    bpy.context.collection.objects.link(root)

    # Mat_IceCrystal: Transmission = 0.93, Roughness = 0.04, IOR = 1.52, Emission Color = #93c5fd, Emission Strength = 2.0
    mat_ice = create_mat(
        "Mat_IceCrystal",
        base_color=(147/255, 197/255, 253/255, 1.0),
        metallic=0.08,
        roughness=0.04,
        ior=1.52,
        transmission=0.93,
        coat=1.0,
        coat_roughness=0.03,
        emission_color=(147/255, 197/255, 253/255, 1.0),
        emission_strength=2.0
    )

    mat_laser = create_mat(
        "Mat_LaserNeedle",
        base_color=(56/255, 189/255, 248/255, 1.0),
        roughness=0.05,
        emission_color=(56/255, 189/255, 248/255, 1.0),
        emission_strength=8.0
    )

    # 8 elongated hexagonal crystal pillars (radius = 4.5 to 7.0)
    shards = [
        {"radius": 0.52, "depth": 7.0, "tunnel_r": 4.8, "angle": 0.0, "z": -4.0, "tilt": (0.12, 0.08, 0.0)},
        {"radius": 0.68, "depth": 8.0, "tunnel_r": 6.0, "angle": math.pi * 0.25, "z": 2.0, "tilt": (-0.15, 0.12, 0.1)},
        {"radius": 0.45, "depth": 6.2, "tunnel_r": 4.6, "angle": math.pi * 0.50, "z": -6.0, "tilt": (0.05, -0.16, 0.0)},
        {"radius": 0.60, "depth": 7.5, "tunnel_r": 6.5, "angle": math.pi * 0.75, "z": 0.5, "tilt": (-0.12, -0.08, 0.15)},
        {"radius": 0.50, "depth": 6.8, "tunnel_r": 5.0, "angle": math.pi * 1.00, "z": -3.5, "tilt": (0.16, -0.05, 0.0)},
        {"radius": 0.72, "depth": 8.5, "tunnel_r": 6.8, "angle": math.pi * 1.25, "z": 3.0, "tilt": (-0.08, 0.15, -0.1)},
        {"radius": 0.48, "depth": 6.0, "tunnel_r": 4.7, "angle": math.pi * 1.50, "z": -5.0, "tilt": (0.10, 0.10, 0.0)},
        {"radius": 0.58, "depth": 7.2, "tunnel_r": 6.2, "angle": math.pi * 1.75, "z": 1.5, "tilt": (-0.14, -0.10, 0.08)},
    ]

    for i, s in enumerate(shards):
        x = math.cos(s["angle"]) * s["tunnel_r"]
        y = math.sin(s["angle"]) * s["tunnel_r"]
        z = s["z"]

        bpy.ops.mesh.primitive_cylinder_add(
            vertices=6,
            radius=s["radius"],
            depth=s["depth"],
            location=(x, y, z),
            rotation=s["tilt"]
        )
        obj = bpy.context.active_object
        obj.name = f"HexShard_{i+1:02d}"

        # Taper pointy tips using bmesh
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        z_vals = [v.co.z for v in bm.verts]
        max_z = max(z_vals)
        min_z = min(z_vals)
        tip_h = (max_z - min_z) * 0.25

        for v in bm.verts:
            if v.co.z > max_z - tip_h:
                fac = (max_z - v.co.z) / tip_h
                v.co.x *= (0.12 + 0.88 * fac)
                v.co.y *= (0.12 + 0.88 * fac)
            elif v.co.z < min_z + tip_h:
                fac = (v.co.z - min_z) / tip_h
                v.co.x *= (0.12 + 0.88 * fac)
                v.co.y *= (0.12 + 0.88 * fac)
        bm.to_mesh(obj.data)
        bm.free()

        bpy.ops.object.shade_smooth()
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = 0.045
        bev.segments = 4
        bev.use_clamp_overlap = True
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier="Bevel")

        obj.data.materials.append(mat_ice)
        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
        obj.parent = root

    # 24 thin light needles around the tunnel ring (higher fidelity so file size > 50KB)
    for i in range(24):
        ang = (i / 24.0) * math.pi * 2.0
        r = 4.2 + (i % 4) * 0.8
        x = math.cos(ang) * r
        y = math.sin(ang) * r
        z = ((i % 8) - 4) * 3.4

        bpy.ops.mesh.primitive_cylinder_add(
            vertices=12,
            radius=0.035,
            depth=7.0,
            location=(x, y, z),
            rotation=(0, 0, 0)
        )
        needle = bpy.context.active_object
        needle.name = f"TunnelNeedle_{i+1:02d}"
        bpy.ops.object.shade_smooth()
        bev_n = needle.modifiers.new(name="Bevel", type='BEVEL')
        bev_n.width = 0.01
        bev_n.segments = 2
        bpy.context.view_layer.objects.active = needle
        bpy.ops.object.modifier_apply(modifier="Bevel")

        needle.data.materials.append(mat_laser)
        needle.parent = root

    out_path = os.path.join(OUTPUT_DIR, "warp_tunnel_shards.glb")
    export_glb(out_path)

# =========================================================================
# 3. MODEL 3: isometric_settlement_grid.glb
# =========================================================================
def build_isometric_settlement_grid():
    setup_scene()
    print("Building isometric_settlement_grid.glb...")

    root = bpy.data.objects.new("SettlementGridRoot", None)
    bpy.context.collection.objects.link(root)

    # Mat_DarkTitanium: Base Color = #030712, Metallic = 0.94, Roughness = 0.22
    mat_titanium = create_mat(
        "Mat_DarkTitanium",
        base_color=(3/255, 7/255, 18/255, 1.0),
        metallic=0.94,
        roughness=0.22,
        coat=0.6,
        coat_roughness=0.12
    )

    # Mat_BrightLED: Base Color = #e0f2fe, Emission Color = #38bdf8, Emission Strength = 5.5
    mat_glow = create_mat(
        "Mat_BrightLED",
        base_color=(224/255, 242/255, 254/255, 1.0),
        metallic=0.1,
        roughness=0.12,
        emission_color=(56/255, 189/255, 248/255, 1.0),
        emission_strength=5.5
    )

    # Subdued LED plate for other tiles
    mat_dark_cap = create_mat(
        "Mat_SubduedLED",
        base_color=(8/255, 16/255, 34/255, 1.0),
        metallic=0.85,
        roughness=0.22,
        emission_color=(30/255, 64/255, 175/255, 1.0),
        emission_strength=0.8
    )

    tile_w = 1.4
    tile_h = 0.35
    gap = 0.12
    step = tile_w + gap # 1.52

    glowing_indices = {7, 11, 12, 13, 14, 18}

    idx = 1
    for r in range(5):
        for c in range(5):
            x = (c - 2) * step
            y = (r - 2) * step

            # BaseBody
            bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x, y, 0))
            base = bpy.context.active_object
            base.name = f"BaseBody_{idx:02d}"
            base.dimensions = (tile_w, tile_w, tile_h)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.shade_smooth()

            bev = base.modifiers.new(name="Bevel", type='BEVEL')
            bev.width = 0.05
            bev.segments = 4
            bev.use_clamp_overlap = True
            bpy.context.view_layer.objects.active = base
            bpy.ops.object.modifier_apply(modifier="Bevel")
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

            base.data.materials.append(mat_titanium)
            base.parent = root

            # TopLEDPlate
            cap_w = tile_w - 0.08
            cap_h = 0.06
            cap_z = (tile_h / 2.0) + (cap_h / 2.0) - 0.01

            bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x, y, cap_z))
            cap = bpy.context.active_object
            cap.name = f"TopLEDPlate_{idx:02d}"
            cap.dimensions = (cap_w, cap_w, cap_h)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.shade_smooth()

            bev_cap = cap.modifiers.new(name="Bevel", type='BEVEL')
            bev_cap.width = 0.025
            bev_cap.segments = 3
            bev_cap.use_clamp_overlap = True
            bpy.context.view_layer.objects.active = cap
            bpy.ops.object.modifier_apply(modifier="Bevel")
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

            if idx in glowing_indices:
                cap.data.materials.append(mat_glow)
            else:
                cap.data.materials.append(mat_dark_cap)

            cap.parent = root
            idx += 1

    out_path = os.path.join(OUTPUT_DIR, "isometric_settlement_grid.glb")
    export_glb(out_path)

# =========================================================================
# 4. MODEL 4: digital_matrix_wall.glb
# =========================================================================
def build_digital_matrix_wall():
    setup_scene()
    print("Building digital_matrix_wall.glb...")

    root = bpy.data.objects.new("MatrixWallRoot", None)
    bpy.context.collection.objects.link(root)

    mat_active = create_mat(
        "Mat_MatrixTile_Active",
        base_color=(56/255, 189/255, 248/255, 1.0),
        metallic=0.1,
        roughness=0.1,
        emission_color=(37/255, 99/255, 235/255, 1.0),
        emission_strength=4.5
    )

    mat_mid = create_mat(
        "Mat_MatrixTile_Mid",
        base_color=(30/255, 64/255, 175/255, 1.0),
        metallic=0.3,
        roughness=0.25,
        emission_color=(37/255, 99/255, 235/255, 1.0),
        emission_strength=2.0
    )

    mat_base = create_mat(
        "Mat_MatrixTile_Base",
        base_color=(3/255, 7/255, 18/255, 1.0),
        metallic=0.8,
        roughness=0.35,
        emission_color=(20/255, 40/255, 100/255, 1.0),
        emission_strength=0.1
    )

    COLS = 40
    ROWS = 25
    step = 0.44
    tile_size = 0.38
    tile_depth = 0.02

    offset_x = ((COLS - 1) * step) / 2.0
    offset_y = ((ROWS - 1) * step) / 2.0

    tile_idx = 1
    for r in range(ROWS):
        for c in range(COLS):
            x = c * step - offset_x
            y = r * step - offset_y

            bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x, y, 0))
            tile = bpy.context.active_object
            tile.name = f"MatrixTile_{tile_idx:04d}"
            tile.dimensions = (tile_size, tile_size, tile_depth)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.shade_smooth()

            bev = tile.modifiers.new(name="Bevel", type='BEVEL')
            bev.width = 0.015
            bev.segments = 2
            bev.use_clamp_overlap = True
            bpy.context.view_layer.objects.active = tile
            bpy.ops.object.modifier_apply(modifier="Bevel")
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

            wave = math.sin(c * 0.28 + r * 0.18)
            if wave > 0.6:
                tile.data.materials.append(mat_active)
            elif wave > 0.1:
                tile.data.materials.append(mat_mid)
            else:
                tile.data.materials.append(mat_base)

            tile.parent = root
            tile_idx += 1

    out_path = os.path.join(OUTPUT_DIR, "digital_matrix_wall.glb")
    export_glb(out_path)

# =========================================================================
# 5. MODEL 5: eclipse_portal_ring.glb
# =========================================================================
def build_eclipse_portal_ring():
    setup_scene()
    print("Building eclipse_portal_ring.glb...")

    root = bpy.data.objects.new("EclipsePortalRoot", None)
    bpy.context.collection.objects.link(root)

    # Mat_CoronaRing: Vibrant Cyan-Blue #0ea5e9, Emission Strength = 8.0
    mat_corona = create_mat(
        "Mat_CoronaRing",
        base_color=(14/255, 165/255, 233/255, 1.0),
        roughness=0.08,
        emission_color=(14/255, 165/255, 233/255, 1.0),
        emission_strength=8.0
    )

    # Mat_VoidDisc: Pure Black #000000, Roughness = 0.99
    mat_void = create_mat(
        "Mat_VoidDisc",
        base_color=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.99
    )

    mat_aura = create_mat(
        "Mat_AtmosphericAura",
        base_color=(14/255, 165/255, 233/255, 1.0),
        roughness=0.15,
        emission_color=(37/255, 99/255, 235/255, 1.0),
        emission_strength=3.5
    )

    # 1. High-res Torus ring (major_radius = 3.2, minor_radius = 0.06, segments = 128x64)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=3.2,
        minor_radius=0.06,
        major_segments=128,
        minor_segments=64,
        location=(0, 0, 0.04)
    )
    torus = bpy.context.active_object
    torus.name = "Eclipse_TorusRing"
    bpy.ops.object.shade_smooth()
    torus.data.materials.append(mat_corona)
    torus.parent = root

    # 2. Solid matte-black inner disc (radius = 3.18)
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=96,
        radius=3.18,
        depth=0.06,
        location=(0, 0, 0.0)
    )
    disc = bpy.context.active_object
    disc.name = "Eclipse_VoidDisc"
    bpy.ops.object.shade_smooth()
    bev_d = disc.modifiers.new(name="Bevel", type='BEVEL')
    bev_d.width = 0.015
    bev_d.segments = 3
    bev_d.use_clamp_overlap = True
    bpy.context.view_layer.objects.active = disc
    bpy.ops.object.modifier_apply(modifier="Bevel")
    disc.data.materials.append(mat_void)
    disc.parent = root

    # 3. Outer atmospheric halo ring
    bpy.ops.mesh.primitive_torus_add(
        major_radius=3.26,
        minor_radius=0.20,
        major_segments=128,
        minor_segments=48,
        location=(0, 0, -0.04)
    )
    halo = bpy.context.active_object
    halo.name = "Eclipse_HaloRing"
    bpy.ops.object.shade_smooth()
    halo.data.materials.append(mat_aura)
    halo.parent = root

    out_path = os.path.join(OUTPUT_DIR, "eclipse_portal_ring.glb")
    export_glb(out_path)

if __name__ == "__main__":
    build_hero_cube_cluster()
    build_warp_tunnel_shards()
    build_isometric_settlement_grid()
    build_digital_matrix_wall()
    build_eclipse_portal_ring()
    print("ALL 5 HIGH-END GLB ASSETS SUCCESSFULLY GENERATED!")
