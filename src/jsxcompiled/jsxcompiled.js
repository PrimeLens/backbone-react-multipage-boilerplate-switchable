
/**** COMPILED 2015-11-10 ****/

/* public/js/router/rc_header_v1.js */
'use strict';

var rc = {};
/* public/jsx-pages/breakingbad/breakingbad.jsx */

rc.breakingbadPageComponent = React.createClass({
    displayName: 'breakingbadPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');

        return React.createElement(
            'div',
            { id: 'breakingbadpage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/breakingbadpage/breakingbad.jpg' }),
            React.createElement(
                'p',
                null,
                'Here we instanciate a shared child component called quizComponent which receives its configuration at the time of instanciation.'
            ),
            React.createElement(
                'p',
                null,
                'This child component is simple and does not save its state when changing away to another page. To do this the state data should be stored in',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'app.status'
                )
            ),
            React.createElement(rc.quizComponent, { data: SiteConfig.quiz.breakingbad })
        );
    }
});

/* public/jsx-pages/dexter/dexter.jsx */
rc.dexterPageComponent = React.createClass({
    displayName: 'dexterPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { id: 'dexterpage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/dexterpage/dexter.jpg' }),
            React.createElement(
                'p',
                null,
                'The Dexter page (as well as the True Blood page) bring in a Parents Advisory child component. Components such as parentsadvisory.jsx are stored in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/public/jsx-special'
                ),
                ' along with any other component that might be shared between pages.'
            ),
            React.createElement(rc.parentsadvisory, null)
        );
    }
});

/* public/jsx-pages/firefly/childcomponents/fireflyDescriptions.jsx */

rc.fireflyDescriptions = React.createClass({
    displayName: 'fireflyDescriptions',

    // the components internal model
    // the array that is databound will update in batches so if the events
    // arrive too fast they will not be implemented.
    // for this reason any data arriving from events is applied to trueArray first
    getInitialState: function getInitialState() {
        return { databindingArray: [] };
    },
    trueArray: [],
    componentDidMount: function componentDidMount() {
        this.trueArray = []; // set to empty every time we return to this page
        var self = this;
        // recieve incoming items       
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount
        grandCentral.off('to_fireflyDescriptions').on('to_fireflyDescriptions', function (data) {
            // add this onto the true model, see main commet at top of file
            self.trueArray.push(data);
            // move trueArray onto the virtual dom and let databinding handle the rest
            self.setState({
                databindingArray: self.trueArray
            });
        });
    },
    handleClick: function handleClick(i) {
        // send the item as a payload on an event
        grandCentral.trigger('to_fireflyImages', this.trueArray[i]);
        // remove the item from the true model
        this.trueArray.splice(i, 1);
        // // move trueArray onto the virtual dom and let databinding handle the rest
        this.setState({
            databindingArray: this.trueArray
        });
    },
    render: function render() {
        // loop through the databindingArray preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.databindingArray.length; i++) {
            outputArray.push(
            // retrieve the key as i and pass to the handleClick function
            // http://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
            React.createElement(
                'div',
                { key: i, onClick: this.handleClick.bind(null, i) },
                this.state.databindingArray[i].description
            ));
        }
        return React.createElement(
            'div',
            { className: 'container one' },
            outputArray
        );
    }
});

/* public/jsx-pages/firefly/childcomponents/fireflyImages.jsx */
rc.fireflyImages = React.createClass({
    displayName: 'fireflyImages',

    // the components internal model
    // the array that is databound will update in batches so if the events
    // arrive too fast they will not be implemented.
    // for this reason any data arriving from events is applied to trueArray first
    getInitialState: function getInitialState() {
        return { databindingArray: [] };
    },
    trueArray: [],
    componentDidMount: function componentDidMount() {
        this.trueArray = []; // set to empty every time we return to this page
        var self = this;
        // recieve incoming items
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount
        grandCentral.off('to_fireflyImages').on('to_fireflyImages', function (data) {
            // add this onto the true model, see main commet at top of file
            self.trueArray.push(data);
            // move trueArray onto the virtual dom and let databinding handle the rest
            self.setState({
                databindingArray: self.trueArray
            });
        });
    },
    handleClick: function handleClick(i) {
        // send the item as a payload on an event
        grandCentral.trigger('to_fireflyDescriptions', this.trueArray[i]);
        // remove the item from the true model
        this.trueArray.splice(i, 1);
        // // move trueArray onto the virtual dom and let databinding handle the rest
        this.setState({
            databindingArray: this.trueArray
        });
    },
    render: function render() {
        // loop through the databindingArray preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.databindingArray.length; i++) {
            outputArray.push(
            // retrieve the key as i and pass to the handleClick function
            // http://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
            React.createElement('img', {
                key: i,
                onClick: this.handleClick.bind(null, i),
                src: this.state.databindingArray[i].imagepath }));
        }
        return React.createElement(
            'div',
            { className: 'container two' },
            outputArray,
            React.createElement('div', { style: { clear: 'both', height: '1px' } })
        );
    }
});

/* public/jsx-pages/firefly/firefly.jsx */

rc.fireflyPageComponent = React.createClass({
    displayName: 'fireflyPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    componentDidMount: function componentDidMount() {
        // after the page is rendered, send  3 test pieces of
        // data into one of the components using events
        // each cchild component will use the same events system to
        // send items to the each other
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath: SiteConfig.assetsDirectory + 'images/fireflypage/firefly-reaver.jpg',
            description: 'Ghoulish Reaver Ships, attacking a village'
        });
        // test piece 2
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath: SiteConfig.assetsDirectory + 'images/fireflypage/firefly-spacestation.jpg',
            description: 'Niska\'s Skyplex Spacestation, orbiting Ezra'
        });
        // test piece 3
        grandCentral.trigger('to_fireflyDescriptions', {
            imagepath: SiteConfig.assetsDirectory + 'images/fireflypage/firefly.jpg',
            description: 'Serenity, Firefly class spaceship'
        });
    },

    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { id: 'fireflypage' },
            React.createElement('img', { className: 'mainpic', src: SiteConfig.assetsDirectory + 'images/fireflypage/firefly-cast.jpg' }),
            React.createElement(
                'p',
                null,
                'This page is an example of event driven architecture where sibling components communicate and pass data.'
            ),
            React.createElement(
                'p',
                null,
                'Click on an item below and it will move to the other container. An item will either take on text form or image form depending upon which container it is in.'
            ),
            React.createElement(
                'p',
                null,
                'Each child component is different and does not save its state when changing away to another page. To do this the state data should be stored in',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'app.status'
                )
            ),
            React.createElement(
                'p',
                null,
                'When an item is clicked the component takes care of itself by removing the item from its model, sending the event to Grand Central with appropriate payload data and finally rerendering according to its models new content.'
            ),
            React.createElement(
                'p',
                null,
                'The last thing to note is that the code for these views is not stored in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/jsx-special'
                ),
                'I chose to do this because its not instanciated on different pages.  Instead each component is instanciated once and is specific to the FireFly page experience.  Therefore it makes sense to store the javascript in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/jsx-pages/firefly'
                )
            ),
            React.createElement(
                'p',
                null,
                'Note the JSX filenames are ignored at compile time, I could have put all components in the one file and it would be the same.'
            ),
            React.createElement(rc.fireflyDescriptions, null),
            React.createElement(rc.fireflyImages, null)
        );
    }

});
/* public/jsx-pages/hannibal/hannibal.jsx */

rc.hannibalPageComponent = React.createClass({
    displayName: 'hannibalPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');

        return React.createElement(
            'div',
            { id: 'hannibalpage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/hannibalpage/hannibal.jpg' }),
            React.createElement(
                'p',
                null,
                'Here we instanciate a shared child component called quizComponent which receives its configuration at the time of instanciation.'
            ),
            React.createElement(
                'p',
                null,
                'This child component is simple and does not save its state when changing away to another page. To do this the state data should be stored in',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'app.status'
                )
            ),
            React.createElement(rc.quizComponent, { data: SiteConfig.quiz.hannibal })
        );
    }
});

/* public/jsx-pages/home/home.jsx */
rc.homePageComponent = React.createClass({
    displayName: 'homePageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { id: 'homepage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/homepage/ghostshell.jpg' }),
            React.createElement(
                'p',
                null,
                'This is a basic page. The jsx and css for this page level component is stored in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/public/jsx-pages'
                )
            ),
            React.createElement(
                'p',
                null,
                'Note that when I reference the url the first fragment after the # is called the page fragment. Subsequent fragments are called 0, 1, 2 etc.',
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '#/pageFragment/fragment0/fragment1/fragment2'
                ),
                React.createElement('br', null),
                'Below are links and summaries of the other pages in the boilerplate.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/exmachina' },
                    'Ex Machina'
                ),
                ' - here is an example showing how during runtime we can switch back to a jQuery rendered backbone view page.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/gameofthrones' },
                    'The Game of Thrones Page'
                ),
                ' - here is an example showing how css can completely break away from the css pattern discussed on the home page. It also shows an extra render panel.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/dexter' },
                    'Dexter and True Blood'
                ),
                ' - here you can see how a child component is shared across multiple pages.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/walkingdead' },
                    'Walking Dead Page'
                ),
                ' - an example showing how to combine deeplinks with pulling data from the config. The browsers back button works with the deeplinks.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/hungergames' },
                    'Hunger Games Page'
                ),
                ' - demonstrates how the component can impose its own local Model onto',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'this.state'
                )
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/hannibal' },
                    'Hannibal and Breaking Bad'
                ),
                ' - here is an example showing how a child component shared across different pages can have different configurations.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/firefly' },
                    'Firefly'
                ),
                ' - this page has two sibling components that communicate to each other using event architecture. I\'ve named the event dispatcher grandCentral.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/madmax' },
                    'Mad Max'
                ),
                ' - this page gives an example of how to use the image loader component in conjunction with the BBPreload library.'
            )
        );
    }
});
/* public/jsx-pages/hungergames/hungergames.jsx */

rc.hungergamesPageComponent = React.createClass({
    displayName: 'hungergamesPageComponent',

    // the components internal model
    getInitialState: function getInitialState() {
        return _.extend(app.status, {
            districtNumber: 13,
            sheSaid: ['Peeta I love you', 'Let\'s kill President Snow']
        });
    },

    // components controllers
    addSaying: function addSaying() {
        // use .concat to create a new array and set it to setState
        this.setState({
            sheSaid: this.state.sheSaid.concat([this.refs.inpText.getDOMNode().value])
        });
    },
    removeSaying: function removeSaying() {
        // use .concat to create a new array and set it to setState
        this.setState({
            sheSaid: this.state.sheSaid.slice(0, this.state.sheSaid.length - 1)
        });
    },
    updateNumber: function updateNumber() {
        this.setState({
            districtNumber: this.refs.inpNumber.getDOMNode().value
        });
    },

    // components view
    render: function render() {
        console.log(this.constructor.displayName + ' render()');

        // loop through the array of strings in preparation for returning the render
        // http://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map
        // and also must have key attribute assigned to prevent getting a warning
        var outputArray = [];
        for (var i = 0; i < this.state.sheSaid.length; i++) {
            outputArray.push(React.createElement(
                'div',
                { key: i },
                this.state.sheSaid[i]
            ));
        }

        return React.createElement(
            'div',
            { id: 'hungergamespage' },
            React.createElement(
                'p',
                null,
                'The Hunger Games page demonstrates how the page can impose its own local Model onto',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'this.state'
                )
            ),
            React.createElement(
                'div',
                null,
                'She is from District ',
                this.state.districtNumber
            ),
            'She said ...',
            React.createElement('br', null),
            outputArray,
            React.createElement(
                'label',
                null,
                'Add a saying '
            ),
            React.createElement('input', { className: 'hungerinput', type: 'text', ref: 'inpText' }),
            React.createElement(
                'div',
                { className: 'linkitem', onClick: this.addSaying },
                'Add'
            ),
            React.createElement(
                'div',
                { className: 'linkitem', onClick: this.removeSaying },
                'Remove a saying '
            ),
            React.createElement('br', null),
            React.createElement(
                'label',
                null,
                'Change her District Number '
            ),
            React.createElement('input', { className: 'hungerinput', type: 'number', ref: 'inpNumber' }),
            React.createElement(
                'div',
                { className: 'linkitem', onClick: this.updateNumber },
                'Update'
            ),
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/hungergamespage/hungergames.jpg' })
        );
    }
});

/* public/jsx-pages/madmax/madmax.jsx */

/*  
    (1) render an empty page 
    (2) show the loader 
    (3) preload the images  
    (4) hide the loader  
    (5) re-render the page 

 this is a stacked loader ie. it runs off a stack 
 of strings which all must clear before it goes away

*/

rc.madmaxPageComponent = React.createClass({
    displayName: 'madmaxPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    preloadArray: [SiteConfig.assetsDirectory + 'images/madmaxpage/furiosa.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/guitarmadmax.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/immortanjoe.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/nuxvehicle.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/openingscene.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/prisoner.jpg', SiteConfig.assetsDirectory + 'images/madmaxpage/witnessme.jpg'],
    preload: function preload() {
        var self = this;
        // reset the preloader
        BBPreload.reset();
        // loop thru adding every image
        _.each(this.preloadArray, function (item, i) {
            BBPreload.add(item);
        });
        // start it up and pass in a callback
        BBPreload.start(function () {
            // app status flag so we never preload this component again
            var name = self.constructor.displayName;
            app.status.completedPreload[name] = true;
            // trigger a re-render, this only happens once so no need to data bind                 
            self.forceUpdate();
            // message the component with spinning gif
            grandCentral.trigger('loaderEnd', 'pageload');
        });
    },
    stillPreloading: true,
    componentWillMount: function componentWillMount() {
        var name = this.constructor.displayName;
        if (!app.status.completedPreload[name]) {
            // message the component with spinning gif
            grandCentral.trigger('loaderStart', 'pageload');
            this.preload();
        }
    },
    render: function render() {
        var name = this.constructor.displayName;
        var completedPreload = app.status.completedPreload[name];
        console.log(this.constructor.displayName + ' render()', completedPreload ? '' : ' (renders blank while preloading)');
        var renderHandle;
        if (!completedPreload) {
            renderHandle = React.createElement('div', { id: 'madmaxpage' });
        } else {
            renderHandle = React.createElement(
                'div',
                { id: 'madmaxpage' },
                React.createElement(
                    'p',
                    null,
                    'The Mad Max page gives an example of how the loader component works in conjunction with the BBPreload library. Throttle the network load time in your browser to see it in action. This is the order of what is happening'
                ),
                React.createElement(
                    'ol',
                    null,
                    React.createElement(
                        'li',
                        null,
                        'It shows the loaderview which contains a spinning gif'
                    ),
                    React.createElement(
                        'li',
                        null,
                        'Preloads the images with BBPreload'
                    ),
                    React.createElement(
                        'li',
                        null,
                        'The callback fires for BBPreload'
                    ),
                    React.createElement(
                        'li',
                        null,
                        'It hides the loaderview'
                    ),
                    React.createElement(
                        'li',
                        null,
                        'Then renders the page'
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    'This is a stacked loader ie. it runs off a stack of strings which all must clear before it goes away.'
                ),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/furiosa.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/guitarmadmax.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/immortanjoe.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/nuxvehicle.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/openingscene.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/prisoner.jpg' }),
                React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/madmaxpage/witnessme.jpg' })
            );
        }
        return renderHandle;
    }
});
/* public/jsx-pages/thrones/thrones.jsx */
rc.thronesPageComponent = React.createClass({
    displayName: 'thronesPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { className: 'whatevercssclass' },
            React.createElement(
                'p',
                null,
                'All the other pages follow specific css pattern. The purpose of this page is to demonstrate that this is not locked to this boilerplate. You can set your own.'
            ),
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/thronespage/gamethrones.jpg' }),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'span',
                    { className: 'specialQuote' },
                    'Valar morghulis'
                ),
                React.createElement('br', null),
                'translates to "all men must die"'
            )
        );
    }
});

/* public/jsx-pages/trueblood/trueblood.jsx */
rc.truebloodPageComponent = React.createClass({
    displayName: 'truebloodPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { id: 'truebloodpage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/truebloodpage/trueblood.jpg' }),
            React.createElement(
                'p',
                null,
                'The True Blood page (as well as the Dexter page) bring in a Parents Advisory child component. Components such as parentsadvisory.jsx are stored in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/public/jsx-special'
                ),
                ' along with any other component that might be shared between pages.'
            ),
            React.createElement(rc.parentsadvisory, null)
        );
    }
});

/* public/jsx-pages/walkingdead/childcomponents/walkingPanel.jsx */

rc.walkingPanel = React.createClass({
    displayName: 'walkingPanel',

    getDefaultProps: function getDefaultProps() {
        return { imagepath: '' };
    },
    render: function render() {
        return React.createElement('img', { src: this.props.imagepath });
    }
});

/* public/jsx-pages/walkingdead/childcomponents/walkingPanelCTA.jsx */
rc.walkingPanelCTA = React.createClass({
    displayName: 'walkingPanelCTA',

    render: function render() {
        return React.createElement(
            'p',
            null,
            'Click a button above to see a character. Watch the URL change. Then use the back button to go back through your sequence.'
        );
    }
});

/* public/jsx-pages/walkingdead/walkingdead.jsx */
rc.walkingPageComponent = React.createClass({
    displayName: 'walkingPageComponent',

    getInitialState: function getInitialState() {
        return _.extend(app.status, {});
    },

    render: function render() {
        console.log(this.constructor.displayName + ' render()');

        // lets have some render logic for an if else to switch between two child components
        // inject the correct data from config based on deeplink
        // OR
        // inject a Call To Action line of copy to prompt the user
        // use an if else condition as per https://facebook.github.io/react/tips/if-else-in-JSX.html

        var key = this.state.currentFragsArray[0];
        var data;
        var panel;

        if (key) {
            data = SiteConfig.walking[key];
            // errorcheck that the deeplink exists in the config and redirect if its bad
            if (!data) {
                window.location.replace('#/walkingdead');
            } else {
                panel = React.createElement(rc.walkingPanel, { imagepath: SiteConfig.assetsDirectory + data.path });
            }
        } else {
            panel = React.createElement(rc.walkingPanelCTA, null);
        }

        return React.createElement(
            'div',
            { id: 'walkingpage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/walkingpage/walkingdead.jpg' }),
            React.createElement(
                'p',
                null,
                'Here we have an example of deeplinks. The page is created from JSON held in a site config file',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/js/config'
                ),
                '. The javascript that reads the config and controls the dom can be found in',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'walkingdead.jsx'
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { className: 'linkitem', href: '#/walkingdead/rick' },
                    'Rick Grimes'
                ),
                React.createElement(
                    'a',
                    { className: 'linkitem', href: '#/walkingdead/daryl' },
                    'Daryl Dixon'
                ),
                React.createElement(
                    'a',
                    { className: 'linkitem', href: '#/walkingdead/michonne' },
                    'Michonne'
                ),
                React.createElement(
                    'a',
                    { className: 'linkitem', href: '#/walkingdead/carol' },
                    'Carol Peletier'
                )
            ),
            React.createElement(
                'div',
                { className: 'panel' },
                panel
            )
        );
    }
});

/* public/jsx-special/header/header.jsx */
rc.header = React.createClass({
    displayName: 'header',

    render: function render() {
        return React.createElement(
            'h2',
            null,
            'Backbone Multipage Boilerplate'
        );
    }
});

/* public/jsx-special/loader/loader.jsx */

// USAGE

// grandCentral.trigger('loaderStart', 'pageload');
// grandCentral.trigger('loaderStart', 'loadmypanel');
// grandCentral.trigger('loaderEnd', 'pageload');
// grandCentral.trigger('loaderEnd', 'loadmypanel');

// the loader will go away once the stack is emptied

// DEPENDANCY :

// jQuery    $.inArray

rc.loader = React.createClass({
    displayName: 'loader',

    // no need for stack to be bound to data
    // so it is a property of the component and outside of this.state
    stack: [],
    getInitialState: function getInitialState() {
        return {
            show: false
        };
    },
    componentDidMount: function componentDidMount(currentPage) {
        var self = this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount   
        grandCentral.off('loaderStart').on('loaderStart', function (uniqueString) {
            if ($.inArray(uniqueString, self.stack) == -1) {
                console.log('loaderStart(' + uniqueString + ')');
                self.stack.push(uniqueString);
                self.setState({ show: true });
            }
        });
        // unbind before binding in case component unmounts/remounts       
        grandCentral.off('loaderEnd').on('loaderEnd', function (uniqueString) {
            var i = $.inArray(uniqueString, self.stack);
            if (i > -1) {
                self.stack.splice(i, 1);
                console.log('loaderEnd(' + uniqueString + ')');
            }
            if (self.stack.length == 0) {
                self.setState({ show: false });
            }
        });
    },
    reset: function reset() {
        this.stack = [];
        this.setState({ show: false });
    },
    render: function render() {
        var classes = this.state.show ? 'active' : '';
        return React.createElement(
            'div',
            { id: 'loader', className: classes },
            React.createElement(
                'div',
                { className: 'loadingmessage' },
                React.createElement('img', { className: 'spinner', src: SiteConfig.assetsDirectory + 'images/ui/spinner.gif' })
            )
        );
    }
});

/* public/jsx-special/nav/nav.jsx */
rc.nav = React.createClass({
    displayName: 'nav',

    getInitialState: function getInitialState() {
        return {
            currentPage: ''
        };
    },
    componentDidMount: function componentDidMount() {
        var self = this;
        // unbind before binding in case component unmounts/remounts, optionally use componentWillUnmount	
        grandCentral.off('pagechange').on('pagechange', function (data) {
            self.setState({
                currentPage: data.currentPage
            });
        });
    },
    getClassNameWithActive: function getClassNameWithActive(arg) {
        var className = 'navitem';
        if (arg == this.state.currentPage) {
            className = className + ' active';
        }
        return className;
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('home'), href: '#' },
                'Home'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('exmachina'), href: '#/exmachina' },
                'Ex Machina'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('gameofthrones'), href: '#/gameofthrones' },
                'Game Of Thrones'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('trueblood'), href: '#/trueblood' },
                'True Blood'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('dexter'), href: '#/dexter' },
                'Dexter'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('walkingdead'), href: '#/walkingdead' },
                'Walking Dead'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('hungergames'), href: '#/hungergames' },
                'Hunger Games'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('hannibal'), href: '#/hannibal' },
                'Hannibal'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('breakingbad'), href: '#/breakingbad' },
                'Breaking Bad'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('firefly'), href: '#/firefly' },
                'Firefly'
            ),
            React.createElement(
                'a',
                { className: this.getClassNameWithActive('madmax'), href: '#/madmax' },
                'Mad Max'
            )
        );
    }
});

/* public/jsx-special/parentsadvisory/parentsadvisory.jsx */
rc.parentsadvisory = React.createClass({
    displayName: 'parentsadvisory',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'parentsadvisory' },
            React.createElement(
                'strong',
                null,
                'Don\'t'
            ),
            React.createElement('br', null),
            'let kids',
            React.createElement('br', null),
            'watch this'
        );
    }
});

/* public/jsx-special/quiz/childcomponents/quizitem.jsx */
rc.quizItemComponent = React.createClass({
    displayName: 'quizItemComponent',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'quizitem' },
            React.createElement('input', { type: 'checkbox', key: this.props.key }),
            React.createElement(
                'span',
                null,
                this.props.label
            )
        );
    }
});

/* public/jsx-special/quiz/quiz.jsx */
rc.quizComponent = React.createClass({
    displayName: 'quizComponent',

    render: function render() {
        // loop through and build up an array which we will include in the render
        var theOptions = [];
        _.each(this.props.data.options, function (value, i) {
            theOptions.push(React.createElement(rc.quizItemComponent, { key: i, label: value }));
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'quizheader' },
                React.createElement('span', { className: 'leftGraphic' }),
                React.createElement(
                    'span',
                    { className: 'quiztitle' },
                    this.props.data.quiztitle
                ),
                React.createElement('span', { className: 'rightGraphic' })
            ),
            React.createElement(
                'div',
                { className: 'options' },
                theOptions
            ),
            React.createElement(
                'div',
                { className: 'submitquizbtn' },
                'Submit'
            )
        );
    }
});
