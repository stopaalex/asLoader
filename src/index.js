/**

asLoader library

meant to be used as a loader for your applications - a progress bar style loader that can be placed at the location of your choosing

 */

const asLoader = function () {

    var args;
    var loaderEle;
    var loaderBarEle;
    var loadingTimeout;
    var loadingInterval;
    var loadingPercent = 0;

    const init = () => {

        args = arguments[0];

        if (arguments[0] === 'default' || arguments[0] === null) {
            // TODO - create a default loader
        } else {
            // TODO - move all the checks into here
        }
        // --- execute argument checks and initiate blanks if needed --- //

        // check for location
        if (!args['location']) { setDefualtLocation(); }
        else {
            if (args['location'].length !== 4 && args['locationType'] === 'custom') { setDefualtLocation(); }
            else {
                if (args['location'].length === 4) {
                    for (let i = 0; i < 4; i++) {
                        if (typeof args['location'][i] !== 'number') {
                            if (args['location'][i] !== null) { setDefualtLocation(); break; }
                        }
                    }
                } else {
                    console.log('id element');
                }
            }
        }

        // check for height
        if (!args['height']) { setDefaultHeight(); }
        else {
            if (typeof args['height'] !== 'number') { setDefaultHeight(); }
        }

        // check for color
        if (!args['color']) { setDefualtColor(); }
        else {
            if (typeof args['color'] !== 'string') { setDefualtColor(); }
        }

        // check for timeout
        if (!args['timeout']) { setDefaultTimeout(); }
        else {
            if (typeof args['timeout'] !== 'number') { setDefaultTimeout(); }
        }

        console.log(args);
    }


    /** create the defualt location object */
    const setDefualtLocation = () => {
        args['location'] = [0, 0, null, 0];
    }

    /** create the default height */
    const setDefaultHeight = () => {
        args['height'] = 4;
    }

    /** create the default color */
    const setDefualtColor = () => {
        args['color'] = 'blue';
    }

    /** create the default timeout */
    const setDefaultTimeout = () => {
        args['timeout'] = 20;
    }

    /** create the loader id */
    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }

    const createLoadingAnimation = () => {
        loadingTimeout = setTimeout(() => {
            // clear the timeout after the interval
            clearInterval(loadingInterval);
            clearTimeout(loadingTimeout);
        }, args['timeout'] * 1000);

        // set the interval
        loadingInterval = setInterval(() => {
            loadingPercent = 95 - ((95 - loadingPercent) / 2);

            document.getElementById('asLoaderBar').style.width = loadingPercent + '%';
        }, 500)
    }

    /**
     * METHODS
     */

    /** start the loader */
    this.start = () => {
        console.log('start loader...');

        let css = '<style>\
            .as-loader-bar-finish {\
                background: radial-gradient(circle, ' + args['color'] + ' 5%, rgba(255,255,255,0) 100%);\
                background: radial-gradient(circle, ' + '#ffffff' + ' 80%, rgba(255,255,255,0) 100%);\
                animation: flair 1000ms ease-in-out 1; \
                border-radius: 100%;\
                box-shadow: 0px 0px 5px rgba(0,0,0,0.25);\
            }\
            @keyframes flair {\
                0% {height: 0px; width:0px; opacity:1 }\
                80% {height: 65px; width: 65px; opacity:1 }\
                100% {height: 100px; width: 100px; opacity:0 }\
            }\
            .as-loader-checkmark-ele {\
                opacity: 0;\
                position: absolute;\
                right: 0;\
                top: 50%;\
                transform: translate(0, -63%);\
                width: 30px;\
                height: 30px;\
                border-radius: 100%;\
                animation: showCheck 1500ms ease-in-out 1;\
            }\
            @keyframes showCheck {\
                0% {opacity: 0 }\
                50% {opacity: 0 }\
                80% {opacity: 1 }\
                100% {opacity: 0 }\
            }\
            .as-loader-checkmark {\
                width: 30px;\
                height: 30px;\
                border-radius: 50%;\
                display: block;\
                stroke-width: 2;\
                stroke: green;\
                stroke-miterlimit: 10;\
                stroke-dashoffset: 0;\
                margin: auto;\
            }\
            .as-loader-xmark {\
                opacity: 0;\
                font-family: arial;\
                position: absolute;\
                top: 50%;\
                transition: 250ms;\
                transform: translate(0, -50%) scaleX(1.5) scaleY(1.25);\
                color: red;\
                background: radial-gradient(circle, white 50%, rgba(255,255,255,0) 100%);\
                padding: 5px;\
                border-radius: 100%;\
                width: 15px;\
                height: 20px;\
                display: flex;\
                justify-content: center;\
                align-items: center;\
            }\
            .as-loader-xmark-fade {\
                opacity: 1;\
                animation: fadeInX 500ms ease-in-out 1;\
            }\
            @keyframes fadeInX {\
                0% {opacity: 0 }\
                100% {opacity: 1 }\
            }\
            .as-loader-xmark-fadeout {\
                transition: 350ms;\
                opacity: 0;\
            }\
        </style>';

        // let location;
        let loaderCreateEle = document.createElement('DIV');
        loaderCreateEle.setAttribute('id', uuidv4());
        loaderCreateEle.setAttribute('class', 'as-loader')
        loaderCreateEle.innerHTML = '<div id="asLoaderBar" class="as-loader-bar" style="width: 0%;height: 100%;transition:500ms;background:' + args['color'] + '"><!-- AS LOADER --></div>\
        <div id="asLoaderBarFlair" class="as-loader-bar-flair" style="position:absolute;right:0;top:50%;transform:translate(50%,-50%);"></div>' + css;

        // set the height and location
        let style = 'height:' + args['height'] + 'px;';
        if (args['locationType'] === 'custom') {
            style += 'position:fixed;'
            args.location.forEach((loc, idx, arr) => {
                if (idx === 0) { style += ('top:' + loc + 'px;') }
                if (idx === 1) { style += ('right:' + loc + 'px;') }
                if (idx === 2) { style += ('bottom:' + loc + 'px;') }
                if (idx === 3) { style += ('left:' + loc + 'px;') }
            });
            loaderCreateEle.setAttribute('style', style);
        } else if (args['locationType'] === 'id') {
            // TODO FIX
            style += 'position:absolute;top:0;right:0;bottom:null;left:0;';
            // args.location.forEach((loc, idx, arr) => {
            //     if (idx === 0) { style += ('top:' + 0 + 'px;') }
            //     if (idx === 1) { style += ('right:' + 0 + 'px;') }
            //     if (idx === 2) { style += ('bottom:' + null + 'px;') }
            //     if (idx === 3) { style += ('left:' + 0 + 'px;') }
            // });
            loaderCreateEle.setAttribute('style', style);
        }


        if (args['locationType'] === 'custom') {
            // if loaderEle exists... remove it
            if (loaderEle) {
                // document.body.removeChild(document.getElementById(loaderEle.id));
                document.body.removeChild(loaderEle);
            }

            //append the loader
            document.body.appendChild(loaderCreateEle);
            loaderEle = document.getElementById(loaderCreateEle.id);

        } else if (args['locationType'] === 'id') {
            if (loaderEle) {
                loaderEle.parentElement.removeChild(loaderEle);
                // document.body.removeChild(document.getElementById(loaderEle.id));
            }
            document.querySelector('#' + args['location']).appendChild(loaderCreateEle);
            loaderEle = document.getElementById(loaderCreateEle.id);
        }
        // set the loader bar
        loaderBarEle = document.getElementById('asLoaderBar');

        // create the loaderTimeout iteration
        if (!loadingInterval) {
            if (!loadingTimeout) {
                // set the timout
                createLoadingAnimation();
            } else {
                // TODO - remove the loading timeout
            }
        } else {
            // TODO remove the loader timeout iteration
            if (!loadingTimeout) {

            } else {
                // TODO - remove the loading timeout
            }
        }
    }

    this.success = () => {
        // clear the timeout and interval
        clearInterval(loadingInterval);
        clearTimeout(loadingTimeout);
        if (!loaderBarEle) {
            return;
        }
        // finish the progress bar
        loaderBarEle.style.width = '100%';
        // create the css
        let checkmarkEle = document.createElement('div');
        checkmarkEle.setAttribute('class', 'as-loader-checkmark-ele');
        let checkmarkHTML = '<svg class="as-loader-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>';
        checkmarkEle.innerHTML = checkmarkHTML;
        // if it's in a contianer... move the checkmark right 10px so it's centered
        if (args['locationType'] == 'id') {
            checkmarkEle.setAttribute('style', 'transform:translate(10px, -63%)');
        }
        // get the flair
        loaderEle.appendChild(checkmarkEle);

        setTimeout(() => {
            let flair = document.getElementById('asLoaderBarFlair');
            flair.classList.add('as-loader-bar-finish');
            setTimeout(() => {
                loaderEle.style.transition = '500ms'
                loaderEle.style.left = '100%';
            }, 250);
            // remove loader
            setTimeout(() => {
                console.log('remove end');
                loaderEle.parentElement.removeChild(loaderEle);
                // document.body.removeChild(loaderEle);
                loaderEle = null;
                loaderBarEle = null;
                loadingTimeout = null;
                loadingInterval = null;
                loadingPercent = null;
            }, 750);
        }, 450);
    }

    this.failure = () => {
        clearInterval(loadingInterval);
        clearTimeout(loadingTimeout);

        if (!loaderBarEle) {
            return;
        }

        let xMarkEle = document.createElement('div');
        xMarkEle.setAttribute('class', 'as-loader-xmark');
        let leftLoc = loaderBarEle.style.width;
        xMarkEle.setAttribute('style', 'left:' + leftLoc + '');

        let xMarkHTML = '<div>x</div>';

        xMarkEle.innerHTML = xMarkHTML;
        loaderEle.appendChild(xMarkEle);
        xMarkEle.classList.add('as-loader-xmark-fade');
        setTimeout(() => {
            console.log('end');
            loaderEle.classList.add('as-loader-xmark-fadeout');
            setTimeout(() => {
                console.log('remove end');
                loaderEle.classList.remove('as-loader-xmark-fadeout');
                loaderEle.parentElement.removeChild(loaderEle);
                // document.body.removeChild(loaderEle);
                loaderEle = null;
                loaderBarEle = null;
                loadingTimeout = null;
                loadingInterval = null;
                loadingPercent = null;
            }, 500)
        }, 2000);
    }

    /** end the loader */
    this.end = () => {
        console.log('end');
        clearInterval(loadingInterval);
        clearTimeout(loadingTimeout);
        if (!loaderBarEle) {
            return;
        }

        loaderBarEle.style.width = '100%';
        setTimeout(() => {
            // let flair = document.getElementById('asLoaderBarFlair');
            // flair.classList.add('as-loader-bar-finish');
            setTimeout(() => {
                loaderEle.style.transition = '500ms'
                loaderEle.style.left = '100%';
            }, 250);
            // remove loader
            setTimeout(() => {
                console.log('remove end');
                loaderEle.parentElement.removeChild(loaderEle);
                // document.body.removeChild(loaderEle);
                loaderEle = null;
                loaderBarEle = null;
                loadingTimeout = null;
                loadingInterval = null;
                loadingPercent = null;
            }, 750);
        }, 450);


    }

    init();

}

// var css = '\
// .as-loader-bar-finish {\
//     background: rgba(255,255,255,0.65);\
//     background: radial-gradient(circle, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 100%);\
//     animation: flair 500ms ease-in-out 1; \
//     border-radius: 100%;\
//     box-shadow: 0px 0px 5px rgba(0,0,0,0.25);\
// }\
// @keyframes flair {\
//     0% {height: 0px; width:0px; opacity:1 }\
//     80% {height: 70px; width: 70px; opacity:1 }\
//     100% {height: 100px; width: 100px; opacity:0 }\
// }';

// var head = document.head || document.getElementsByTagName('head')[0];
// var style = document.createElement('style');

// head.appendChild(style);

// style.type = 'text/css';
// if (style.styleSheet) {
//     // This is required for IE8 and below.
//     style.styleSheet.cssText = css;
// } else {
//     style.appendChild(document.createTextNode(css));
// }

// let loader = new asLoader(
//     {
//         locationType: 'custom',
//         location: [42, 0, null, 0],
//         height: 4,
//         color: 'teal',
//         timeout: 20
//     }
// );
// let loader = new asLoader(
//     {
//         locationType: 'custom',
//         location: [42, 0, null, 0],
//         height: 4,
//         color: 'rgb(24,0,255)',
//         timeout: 20
//     }
// );

// loader.start();

// setTimeout(() => {
//     loader.end();
// }, 1000);