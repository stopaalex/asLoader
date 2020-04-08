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
            if (args['location'].length !== 4) { setDefualtLocation(); }
            else {
                for (let i = 0; i < 4; i++) {
                    if (typeof args['location'][i] !== 'number') {
                        if (args['location'][i] !== null) { setDefualtLocation(); break; }
                    }
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
            loadingPercent = 92 - ((100 - loadingPercent) / 2);

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
                animation: flair 500ms ease-in-out 1; \
                border-radius: 100%;\
                box-shadow: 0px 0px 5px rgba(0,0,0,0.25);\
            }\
            @keyframes flair {\
                0% {height: 0px; width:0px; opacity:1 }\
                80% {height: 25px; width: 25px; opacity:1 }\
                100% {height: 50px; width: 50px; opacity:0 }\
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

        }


        if (args['locationType'] === 'custom') {
            // if loaderEle exists... remove it
            if (loaderEle) {
                document.body.removeChild(document.getElementById(loaderEle.id));
            }

            //append the loader
            document.body.appendChild(loaderCreateEle);
            loaderEle = document.getElementById(loaderCreateEle.id);

        } else if (args['locationType'] === 'id') {
            if (loaderEle) {
                document.body.removeChild(document.getElementById(loaderEle.id));
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

    /** end the loader */
    this.end = () => {
        console.log('end');
        clearInterval(loadingInterval);
        clearTimeout(loadingTimeout);
        loaderBarEle.style.width = '100%';
        setTimeout(() => {
            let flair = document.getElementById('asLoaderBarFlair');
            flair.classList.add('as-loader-bar-finish');
            setTimeout(() => {
                loaderEle.style.transition = '500ms'
                loaderEle.style.left = '100%';
            }, 250);
            // remove loader
            setTimeout(() => {
                console.log('end');
                document.body.removeChild(loaderEle);
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

let loader = new asLoader(
    {
        locationType: 'custom',
        location: [42, 0, null, 0],
        height: 4,
        color: 'teal',
        timeout: 20
    }
);
// let loader = new asLoader(
//     {
//         locationType: 'custom',
//         location: [42, 0, null, 0],
//         height: 4,
//         color: 'rgb(24,0,255)',
//         timeout: 20
//     }
// );

loader.start();

setTimeout(() => {
    loader.end();
}, 1000);