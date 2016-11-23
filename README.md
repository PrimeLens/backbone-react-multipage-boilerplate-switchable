# Backbone React Multipage Boilerplate (switchable)

Client side javascript web app boilerplate that allows the route to switch between react pages and jquery pages. Router is separated away from the rest of the app. Minimal use of dependencies to increase future-proofing and easy a pivot on tech stack.

## Definitions used in this readme for Framework, Boilerplate and Library
- a **Framework** contains a router, hooks and containers and it provides a method of organization. Examples are Angular, Ember, Meteor, Knockout, Backbone, Flux (but not React which I consider to be a render engine).
- a **Boilerplate** is one persons (or companies) implementation of a framework or tech stack. It serves as a template for new projects.
- a **Library** is a grouping of methods that are related to eachother. For example underscore, jQuery and tweenmax.

![diagram of javascript reference architecture](./readme/boilerplate-code-division-v2.jpg?raw=true)

# Philosophy of this boilerplate
- A minimum number of open source technologies are used, just enough to get the job done and stay current.
- The router is separated from the rest of the app so it can be replaced with minimal rewrite if we need to change the tech stack. When this happens only the route tunnel function is re-written.
- The route tunnel has a switcher that decides which render engine (jquery or react) is used on each route. In the future there are plans to support web components in a similar way. Gradual transition of render technology can then take place.
- A "learn by example" philosphy is used so many examples are provided within the boilerplate. This allows for faster ramp-up time for freelancers. Examples are arranged from easy to hard in the site's nav, one example per page.
- Boilerplate management files are stored separately in `/srcbase` and developer code for the project in `/src`
- We aim for complete decoupling of UI components so no component should reach into another to run a method. Instead components communicate using events via an event dispatcher named grandCentral. Examples are given on the more complex pages. Any parent-child relationship required by layout only exists in the DOM (and this.props) because the reality is that all react components are really siblings that hang from a window level object named rc. This allows for fast layout redesigns. If backbone views are used for older jQuery pages the same event architecture is applied.
-  A "thin component" philosphy should be maintained. By this I mean that if a method can be taken out from a render layer component and instead moved to a library, then it should be. That way when it comes time to translate a component to another render engine with minimal code change (example from react to whatever comes next).
- Libraries written by developers should use the module-reveal pattern and be stored in `/lib_developer`. These might include an IO library (to handle ajax), a data transforms library, a processLoop lib if you were writing a game. etc.
- Files such as .css .sass .jsx .js .html as well as test files are stored together in the folder for that relevant component. Folder structure is up to the devs as files are pulled in by gulp with a wild card. When a component is retired, the folder is moved to the ignore folder or deleted.
- All css for that component should be scoped (aka prefixed) to that component. You can do this manually for each rule or by using SASS nesting.

### To quickly see everything working without node
1. Download the repo
2. Drag `index.html` onto a browser. This file is located in `/public` 

`index.html` uses `/public/prod/start.js` and `/public/prod/start.css` and along with a handful of images you can see it all working to show you examples on each page.

### To see everything working using a node server
Download and checkout the correct git branch. From the command line type `npm install` followed by `node server` and then go to `http://localhost:3000` in the browser. This also gives you access to compile (see below and further down the Summary of Node and Gulp commands).

### Brief explanation on compile

Node and Gulp gather all the scripts from `/src` and `/srcbase` and output them to `/public/prod`. The babel plugin is used to translate jsx. 

##Features
* multi page
* deep links
* changing a deeplink within the page does not reload the page
* browser back button works across pages and deeplinks
* current page, last page, url querystrings all stored in app.status 
* pre page hook
* post page hook
* app start hook
* event driven architecture (so components can communicate to eachother, examples given)
* default nav, loader, header, footer, modal and pages that can be removed or altered
* loader with a logic stack (see comments in code)
* modal is event driven, contains templates and is deep linkable
* a system called Hermes that safely allows JSON to be passed to an identical boiler on another server
* all code files are well commented

## Management
There is a clear line between project files and boilerplate files. When working on a project the devs should stick to `/src`. Any improvements to the boilerplate can be rolled out to projects by altering `/srcbase`.

## Developers FAQ

* **HTML**<br>Mostly this exists for legacy apps using previous version of the [old boilerplate](https://github.com/PrimeLens/backbone-multipage-boilerplate) however the structure.html partial is still used as a top level div structure that is injected as the app loads. This is to support situations where we are delivering a javascript app to another vendor or company's html page. It also means react is not baked in at a high level and is instead used by choice at the route level.

* **Delete a page**<br>For example lets delete the demo `dexter` page
  1. delete folder `/jsx-pages/dexter` or move it to `/jsx-ignored`
  2. open `/scr/js/router/router_developer.js`
  3. Delete the url route <br>`'dexter(/*path)': function(f, q){ this.routeTunnel('react', dexter', this.dexterView, f, q) },`
  4. Edit `/jsx-special/nav.jsx` to remove the relevant dexter link

* **Create a page**<br>For example lets create an About page
 1. Edit `/jsx-special/nav.jsx` to add the new page
 2. Open `scr/js/router/router_developer.js` and create a route <br>`about(/*path)': function(f, q){ this.routeTunnel('react', 'about', rc.aboutPageComponent, f, q) },`
 4. Create the folder `/src/jsx-pages/about` and create `about.jsx` and `about.scss` inside it
 5. Edit `about.jsx` in that folder using the following pattern


##### _React Page Template_

    var rc.aboutPageComponent = React.createClass({ 
        render: function(){
            console.log(this.constructor.displayName+' render()');
            return (
            <div id="aboutpage">
                <p>About Us</p>
            </div>
            );
        }
    });


* **Create a component that is not a page**<br>
This is the same as creating a page component. Store either in `/jsx-special` or in the child-components folder for your page

* **Best Practices**<br>
  * When coding a React page don't use jQuery in the component. For $.ajax or $.cookie move the code into a library and reference it from there.
  * Try to separate the display logic to any business logic or data massaging or api calls. In otherwords dom stuff should live in a component, all other code try to move to a javascript library (see `BBPreload.js` as an example).


## Summary of Node and Gulp commands

`gulp build` to do a clean and a fresh recompile

`gulp buildwatch` to clean then compile and place a watcher on the folder that will trigger a recompile in the event of a code change.

`gulp clean` delete the compiled files.

`node server` starts a server at http://localhost:3000 to change the port number edit `server.js` you will need different port numbers if you want more than one project open

`gulp testwatch` is a newly added task that invokes the karma test runner to run all unit tests written for each component.

`gulp killdemo` remove all examples and demo code, then run a build again.


## Order of compiling (for your reference)

Step 1 - Gulp compiles all html as per old boilerplate to htmlpartials 


Step 2 - Gulp transcodes all JSX project files to javascript from

    src/jsx-special/**/*.jsx
    src/jsx-pages/**/*.jsx

into a javascript file here

    srcbase/jsxcompiled/jsxcompiled.js


Step 3 - Gulp compiles all sass and css in order from

    src/views-special/**/structure.scss
    src/views-special/**/*.scss
    src/views-pages/**/*.scss
    src/jsx-special/**/*.scss
    src/jsx-pages/**/*.scss     

to this css file here

    public/prod/start.css


Step 4 - Gulp compiles all javascript in order from

    srcbase/js/prefix*.js                    
    src/js/config/config.js
    src/js/config/*.js
    src/js/lib_developer/**/*.js
    srcbase/htmlcompiled/htmlpartials.js
    src/views-special/**/*.js
    src/views-pages/**/*.js
    srcbase/jsxcompiled/jsxcompiled.js        
    srcbase/js/grandcentral.js
    srcbase/js/router_base*.js
    src/js/router/router_developer.js
    srcbase/js/appstarter*.js

to

    public/prod/start.js


## Unit Testing with Jasmine and Karma
Use the node command `gulp testwatch` which is a newly added task that invokes the karma test runner to run all unit tests written for each component. Developers should keep their unit tests in the same folder as the code for their component.  Example tests are provided for the Firefly demo page.


## Pre-requisites
- node
- global install of gulp-cli. to do this type npm install --global gulp-cli

## Final note on SASS being added
- SASS support in gulp only covers nesting and variables
- any SASS complexity you may want above that would be on your own fork and may not be supported by this gulp implementation

## Deploying to heroku
- this boilerplate is ready to go for heroku git deployment
- use the heroku cli and follow heroku's instructions for adding a git remote
- remember you must specify the branch so instead of writing `git push heroku master` on the command line you would write `git push heroku 2016-macmillan:master`
