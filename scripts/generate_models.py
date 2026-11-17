import bpy
import bmesh
import math
import os

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "models"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat, do_unlink=True)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh, do_unlink=True)

def create_mat(name, base_color=(1,1,1,1), metallic=0.0, roughness=0.5, ior=1.45, transmission=0.0, emission_color=(0,0,0,1), emission_strength=0.0):
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
    if 'Emission Color' in bsdf.inputs:
        bsdf.inputs['Emission Color'].default_value = emission_color
    if 'Emission Strength' in bsdf.inputs:
        bsdf.inputs['Emission Strength'].default_value = emission_strength
    
    return mat

# ==========================================
# 1. ASSET 1: hero_cube_cluster.glb
# ==========================================
def build_hero_cube_cluster():
    clear_scene()
    print("Building hero_cube_cluster.glb...")
    
    # Materials
    # Mat_FrostedBlue: Deep navy/cobalt glass (#0a192f, Transmission: 0.85, Roughness: 0.18, IOR: 1.45)
    mat_frosted_blue = create_mat(
        "Mat_FrostedBlue",
        base_color=(10/255, 25/255, 47/255, 1.0),
        metallic=0.1,
        roughness=0.18,
        ior=1.45,
        transmission=0.85,
        emission_color=(15/255, 35/255, 65/255, 1.0),
        emission_strength=0.3
    )
    
    # Mat_EmissiveCore: Pure cyan-white glowing material (#60a5fa, Emission Strength: 4.5)
    mat_emissive_core = create_mat(
        "Mat_EmissiveCore",
        base_color=(224/255, 242/255, 254/255, 1.0),
        metallic=0.0,
        roughness=0.1,
        ior=1.45,
        transmission=0.2,
        emission_color=(96/255, 165/255, 250/255, 1.0),
        emission_strength=4.5
    )
    
    cube_size = 0.92
    step = 1.05
    cube_index = 1
    
    # 3x3x3 grid centered
    for x in (-1, 0, 1):
        for y in (-1, 0, 1):
            for z in (-1, 0, 1):
                loc = (x * step, y * step, z * step)
                bpy.ops.mesh.primitive_cube_add(size=cube_size, location=loc)
                obj = bpy.context.active_object
                obj.name = f"cube_{cube_index:02d}"
                
                # Add bevel modifier
                bev = obj.modifiers.new(name="Bevel", type='BEVEL')
                bev.width = 0.04
                bev.segments = 3
                bpy.context.view_layer.objects.active = obj
                bpy.ops.object.modifier_apply(modifier="Bevel")
                
                # Assign material: Core cubes (0,0,0) or top-center (0,0,1) get emissive core
                # Others frosted blue with dual material slot if top face
                obj.data.materials.append(mat_frosted_blue)
                obj.data.materials.append(mat_emissive_core)
                
                is_core = (x == 0 and y == 0 and z == 0)
                is_top_center = (x == 0 and y == 0 and z == 1)
                
                if is_core or is_top_center:
                    # Assign all faces to emissive core
                    for poly in obj.data.polygons:
                        poly.material_index = 1
                else:
                    # Top face (+Z) gets emissive core for aesthetic glow, others frosted blue
                    if z >= 0:
                        for poly in obj.data.polygons:
                            if poly.normal.z > 0.7:
                                poly.material_index = 1
                            else:
                                poly.material_index = 0
                    else:
                        for poly in obj.data.polygons:
                            poly.material_index = 0
                
                # Ensure origin is at geometry center
                bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
                cube_index += 1

    out_path = os.path.join(OUTPUT_DIR, "hero_cube_cluster.glb")
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_apply=True
    )
    print(f"Exported hero_cube_cluster.glb -> {out_path} ({os.path.getsize(out_path)} bytes)")

# ==========================================
# 2. ASSET 2: isometric_platform.glb
# ==========================================
def build_isometric_platform():
    clear_scene()
    print("Building isometric_platform.glb...")
    
    # Materials
    # Mat_MatteMetal: Dark matte metallic sides (#0f172a, Metallic: 0.9, Roughness: 0.25)
    mat_metal_sides = create_mat(
        "Mat_MatteMetalSides",
        base_color=(15/255, 23/255, 42/255, 1.0),
        metallic=0.9,
        roughness=0.25
    )
    
    # Mat_IceBlueGlow: Glowing white/ice-blue top faces (#e0f2fe, Emission Strength: 3.0)
    mat_ice_blue_glow = create_mat(
        "Mat_IceBlueGlow",
        base_color=(224/255, 242/255, 254/255, 1.0),
        metallic=0.1,
        roughness=0.15,
        emission_color=(224/255, 242/255, 254/255, 1.0),
        emission_strength=3.0
    )
    
    # Mat_DarkTop: For corner tiles top face
    mat_dark_top = create_mat(
        "Mat_DarkTop",
        base_color=(25/255, 35/255, 55/255, 1.0),
        metallic=0.8,
        roughness=0.3,
        emission_color=(96/255, 165/255, 250/255, 1.0),
        emission_strength=0.4
    )
    
    tile_w = 1.0
    tile_h = 0.25
    gap = 0.15
    step = tile_w + gap
    
    tile_index = 1
    # 3x3 array in X-Y (horizontal ground plane in Blender is X-Y, Z is vertical)
    for ix, x in enumerate((-1, 0, 1)):
        for iy, y in enumerate((-1, 0, 1)):
            loc = (x * step, y * step, 0)
            bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc)
            obj = bpy.context.active_object
            obj.dimensions = (tile_w, tile_w, tile_h)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            obj.name = f"tile_{tile_index:02d}"
            
            # Bevel modifier
            bev = obj.modifiers.new(name="Bevel", type='BEVEL')
            bev.width = 0.04
            bev.segments = 3
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.modifier_apply(modifier="Bevel")
            
            obj.data.materials.append(mat_metal_sides)
            obj.data.materials.append(mat_ice_blue_glow)
            obj.data.materials.append(mat_dark_top)
            
            # Is center or cross tile?
            is_center = (x == 0 and y == 0)
            is_cross = (x == 0 or y == 0)
            
            for poly in obj.data.polygons:
                # Top face (normal pointing up +Z)
                if poly.normal.z > 0.7:
                    if is_center or is_cross:
                        poly.material_index = 1 # Glowing ice-blue
                    else:
                        poly.material_index = 2 # Dark metallic with subtle rim glow
                else:
                    poly.material_index = 0 # Metallic sides
            
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
            tile_index += 1

    out_path = os.path.join(OUTPUT_DIR, "isometric_platform.glb")
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_apply=True
    )
    print(f"Exported isometric_platform.glb -> {out_path} ({os.path.getsize(out_path)} bytes)")

# ==========================================
# 3. ASSET 3: hex_crystals.glb
# ==========================================
def build_hex_crystals():
    clear_scene()
    print("Building hex_crystals.glb...")
    
    # Mat_HexCrystal: High-gloss translucent white/blue crystal shader
    mat_crystal = create_mat(
        "Mat_HexCrystal",
        base_color=(224/255, 242/255, 254/255, 1.0),
        metallic=0.05,
        roughness=0.06,
        ior=1.55,
        transmission=0.9,
        emission_color=(96/255, 165/255, 250/255, 1.0),
        emission_strength=1.5
    )
    
    # 6 crystals with varying sizes, lengths, and orientations
    crystal_configs = [
        {"radius": 0.28, "depth": 2.8, "loc": (-1.2, 0.4, 0.2), "rot": (0.2, 0.3, 0.1)},
        {"radius": 0.42, "depth": 3.6, "loc": (1.1, -0.3, -0.1), "rot": (-0.25, 0.15, 0.4)},
        {"radius": 0.22, "depth": 2.2, "loc": (-0.5, -1.0, 0.3), "rot": (0.3, -0.2, -0.2)},
        {"radius": 0.35, "depth": 3.1, "loc": (0.6, 1.2, -0.2), "rot": (-0.1, -0.35, 0.15)},
        {"radius": 0.20, "depth": 1.9, "loc": (-1.5, -0.8, -0.3), "rot": (0.15, 0.25, 0.5)},
        {"radius": 0.38, "depth": 3.4, "loc": (1.4, 0.9, 0.4), "rot": (-0.3, 0.1, -0.3)},
    ]
    
    for i, cfg in enumerate(crystal_configs):
        # Create cylinder with 6 vertices
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=6,
            radius=cfg["radius"],
            depth=cfg["depth"],
            location=cfg["loc"],
            rotation=cfg["rot"]
        )
        obj = bpy.context.active_object
        obj.name = f"crystal_{i+1:02d}"
        
        # Taper ends to look like a crystal prism using bmesh
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        
        # Find top and bottom vertices and scale them in to form tips
        z_coords = [v.co.z for v in bm.verts]
        max_z = max(z_coords)
        min_z = min(z_coords)
        tip_threshold = (max_z - min_z) * 0.25
        
        for v in bm.verts:
            if v.co.z > max_z - tip_threshold:
                factor = (max_z - v.co.z) / tip_threshold
                v.co.x *= (0.2 + 0.8 * factor)
                v.co.y *= (0.2 + 0.8 * factor)
            elif v.co.z < min_z + tip_threshold:
                factor = (v.co.z - min_z) / tip_threshold
                v.co.x *= (0.2 + 0.8 * factor)
                v.co.y *= (0.2 + 0.8 * factor)
                
        bm.to_mesh(obj.data)
        bm.free()
        
        # Bevel slightly for realistic crystal edges
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = 0.02
        bev.segments = 2
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier="Bevel")
        
        obj.data.materials.append(mat_crystal)
        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')

    out_path = os.path.join(OUTPUT_DIR, "hex_crystals.glb")
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format='GLB',
        export_draco_mesh_compression_enable=True,
        export_apply=True
    )
    print(f"Exported hex_crystals.glb -> {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    build_hero_cube_cluster()
    build_isometric_platform()
    build_hex_crystals()
    print("ALL 3D ASSETS SUCCESSFULLY GENERATED!")
