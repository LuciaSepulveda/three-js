import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        if (mountRef.current !== undefined && mountRef.current !== null) {
            const currentMount = mountRef.current

            //scene
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(
                25,
                currentMount.clientWidth / currentMount.clientHeight,
                0.1,
                1000
            )
            camera.position.z = 10
            scene.add(camera)

            //renderer
            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)

            currentMount.appendChild(renderer.domElement)
            console.log('entra aca')

            //controls

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true

            //textures
            const textureLoader = new THREE.TextureLoader()

            //base color
            const map = textureLoader.load('./bricks/Brick_Wall_017_basecolor.jpg')

            //ambiental oclussion
            const ambientalOclussion = textureLoader.load('./bricks/Brick_Wall_017_ambientOcclusion.jpg')

            //roughness
            const roughness = textureLoader.load('./bricks/Brick_Wall_017_roughness.jpg')

            //normales
            const normals = textureLoader.load('./bricks/Brick_Wall_017_normal.jpg')

            // displacement map
            const height = textureLoader.load('./bricks/Brick_Wall_017_height.png')

            //Cube
            const cube = new THREE.Mesh(
                new THREE.BoxBufferGeometry(3, 3, 3, 250, 250, 250),
                new THREE.MeshStandardMaterial({
                    map: map,
                    aoMap: ambientalOclussion,
                    roughnessMap: roughness,
                    normalMap: normals,
                    displacementMap: height,
                    displacementScale: 0.07,
                })
            )

            cube.position.set(0, 0, 0)

            scene.add(cube)

            //Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
            const pointLight = new THREE.PointLight(0xffffff, 1.3)
            pointLight.position.y = 6

            //directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
            directionalLight.position.set(5, 5, 5)
            scene.add(ambientLight)
            //scene.add(pointLight)
            scene.add(directionalLight)

            //render
            const animate = () => {
                controls.update()
                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }

            animate()

            //clean up scene
            return () => {
                currentMount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>
}

export default Scene
