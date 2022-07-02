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
            //Cube
            const cube = new THREE.Mesh(
                new THREE.BoxBufferGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.3, wireframe: true })
            )

            cube.position.set(0, 0, 0)

            const sphere = new THREE.Mesh(
                new THREE.SphereBufferGeometry(0.5),
                new THREE.MeshNormalMaterial({ flatShading: true })
            )

            sphere.position.set(-3, 0, 0)

            const textureLoader = new THREE.TextureLoader()
            const matcap = textureLoader.load('./textures/matcap.png')

            const sphere1 = new THREE.Mesh(
                new THREE.SphereBufferGeometry(0.5),
                new THREE.MeshMatcapMaterial({ matcap: matcap })
            )

            sphere1.position.set(3, 0, 0)

            scene.add(cube)
            scene.add(sphere)
            scene.add(sphere1)

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
