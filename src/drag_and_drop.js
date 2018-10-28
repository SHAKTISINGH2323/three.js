    // to demonstrate the drag and drop in threejs
    
    // global variables
    var renderer;
    var scene;
    var camera;

    var control;

    function init() {
        setupDragDrop();
        setupScene();
    }

    function setupDragDrop() {
        var holder = document.getElementById('holder');
        // check if filereader is available
        if (typeof window.FileReader === 'undefined') {
            console.error("Filereader not supported");
        }

        holder.ondragover = function () {
            this.className = 'hover';
            return false;
        };
        holder.ondragend = function () {
            this.className = '';
            return false;
        };

        holder.ondrop = function (e) {
            this.className = '';
            e.preventDefault();

            var file = e.dataTransfer.files[0];
            console.log(file);
                reader = new FileReader();
            reader.onload = function (event) {
                console.log(event.target);
                console.log(event);
                holder.style.background = 'url(' + event.target.result + ') no-repeat center';

                var image = document.createElement('img');
                image.src = event.target.result;
                var texture = new THREE.Texture(image);
                texture.needsUpdate = true;

                scene.getObjectByName('cube').material.map = texture;
            };
            reader.readAsDataURL(file);

            return false;
        }

    }

    function setupScene() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight / 1.5), 0.1, 1000);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, (window.innerHeight / 1.5));

        // create a cube and add to scene
        var cubeGeometry = new THREE.BoxGeometry(10 * Math.random(), 10 * Math.random(), 10 * Math.random());
        var texture=new THREE.TextureLoader().load();
        var cubeMaterial = new THREE.MeshBasicMaterial({map:texture});

        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name = 'cube';
        scene.add(cube);

        // position and point the camera to the center of the scene
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        control = new function () {
            this.rotationSpeed = 0.005;
            this.scale = 1;
        };
        addControls(control);

        // call the render function
        render();
    }

    function addControls(controlObject) {
        var gui = new dat.GUI();
        gui.add(controlObject, 'rotationSpeed', -0.1, 0.1);
        gui.add(controlObject, 'scale', 0.01, 2);
    }

    function render() {
        renderer.render(scene, camera);
        scene.getObjectByName('cube').rotation.x += control.rotationSpeed;
        scene.getObjectByName('cube').scale.set(control.scale, control.scale, control.scale);

        requestAnimationFrame(render);
    }

    // calls the init function when the window is done loading.
    window.onload = init;
