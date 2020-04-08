/**

asLoader library

meant to be used as a loader for your applications - a progress bar style loader that can be placed at the location of your choosing

 */

const asLoader = function() {

    // console.log(arguments);
    const args = {};

    for (let key in  arguments) {
        let el = arguments[key];
        // location check
        if (el['location']) {
            args['location'] = el['location'];
        } else {
            args['location'] = [0, 0, null, 0]
        }
        // height check
        if (el['height']) {
            
        }
        // console.log(arguments[key]);
    }

    console.log(args);

    // var location = loc;

    /** start the loader */
    this.start = () => {
        console.log('location');
    }

    /** end the loader */
    this.end = () => {

    }

}

let loader = new asLoader({
    location: [42, 0, null, 0],
    height: 10,
    color: 'blue'
});

loader.start();