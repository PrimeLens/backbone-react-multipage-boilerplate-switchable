# Backbone React Multipage Boilerplate (switchable)

This boilerplate app switches between react pages and jquery pages with a backbone router which specifies which render engine to use on each route.

This is based on my earlier [Backbone Multipage Boilerplate](https://github.com/PrimeLens/backbone-multipage-boilerplate) which we used extensively at Macy's. I have not had a chance to vet this one at an enterprise level, also there might be some typos in the docs as I'm still cleaning it up. For those that know react and my earlier boilerplate this should be easy.

The output script in `/prod` depends on node, grunt and babel to translate jsx and compile. A simple node serer is also provided for localhost. Backbone (and its dependency underscore) are used as a central point that either brings in react pages or jquery pages. This can easily be modified to remove the option to bring in legacy jquery pages.

All functionality and examples are also caried over from the last boilerplate including hooks and status report objects and others. Scroll down to Features for more info on what is it can do.

### To quickly see everything working without node
1. Download the repo
2. Drag `index.html` onto a browser. This file is located in `/public` 

`index.html` uses `/public/prod/start.js` and `/public/prod/start.css` and along with a handful of images you can see it all working to show you examples on each page.

### To see everything working using a node server
From the command line type `npm install` followed by `node server` and then go to `http://localhost:3000` in the browser. This also gives you access to compile.

### Brief explanation on compile

This boilerplate uses Grunt/Babel but you could easily switch to Gulp or Webpack.

## Objective of this Boilerplate

* Minimize dependancies but still allow legacy jQuery pages to be used without rewriting them.
* To easily bring pieces from project to project (e.g. pages or nav).
* To separate display layer code (dom manipulation) from business logic or data.massaging. I cover this more in Best Practices.
* A management system for a team of devs. This means a clear distinction between project files for the devs and files for the boilerplate which the manager or team lead can administer.


##Features
* multi page
* link to page
* deep linking to url fragments within the page (eg #/walkingdead/carol)
* changing a deeplink within the page does not reload the page
* browser back button works across pages and deeplinks
* current page, last page, url querystrings all stored in app.status 
* pre page hook
* post page hook
* app start up hook
* event driven architecture (so components can communicate to eachother, examples given)
* default nav, loader, header, footer, modal and pages that can be removed or altered
* all code files are well commented

## Management
There is a clear line between project files and boilerplate files. When working on a project devs should stick to the 

    /public/jsx-pages
    /public/jsx-special
    /public/jsx-notcompiled

They can also add libs and config files under `/public/js` however inside `/public/js/router` the only file the devs should touch is `router_developer.js`.

`router_developer.js` is where the dev can handle url routing and access certain hooks.

## Developers FAQ
* **The Public Folder**<br>Outside the public folder is all the server relevant stuff such as node and grunt files. Inside the public folder is all the site stuff devs would be working on.

* **HTML**<br>See the [old boilerplate](https://github.com/PrimeLens/backbone-multipage-boilerplate) on how htmlpartials are used. The structure htmlpartial is still used in the same way here.

* **Delete a page**<br>For example lets delete the demo `dexter` page
  1. delete folder `/dexter` or move it to `/jsx-notcompiled`
  2. open `public/js/router/router_developer.js`
  3. Delete the url route <br>`'dexter(/*path)': function(f, q){ this.routeTunnel('react', dexter', this.dexterView, f, q) },`
  4. Edit `nav.jsx` to remove the page

* **Create a page**<br>For example lets create an About page
 1. Edit `nav.jsx` to add the new page
 2. Open `public/js/router/router_developer.js` and create a route <br>`about(/*path)': function(f, q){ this.routeTunnel('react', 'about', rc.aboutPageComponent, f, q) },`
 4. Create the folder `/public/jsx-pages/about` and create `about.jsx` and `about.css` inside it
 5. Edit `about.jsx` in that folder using the following pattern





##### _React Page Template_



    rc.aboutPageComponent = React.createClass({
        getInitialState: function(){
            return _.extend(app.status, {
            })
        },    
        render: function(){
            console.log(this.constructor.displayName+' render()');
            return (
            <div id="aboutpage">
                <p>About Us</p>
            </div>
            );
        }
    });


* **Create a view that is not a page**<br>
This is the same as creating a page component. Store either in `/jsx-special` or in the folder for your page

* **Best Practices**<br>
  * When coding a React page only use jQuery for ajax or working with cookies or local storage.
  * Try to separate the display logic to any business logic or data massaging or api calls. In otherwords dom stuff should live in a component, all other code try to move to a javascript library (see `BBPreload.js` as an example).


## Summary of Node and Grunt commands

`grunt clean` to wipe out compiled files

`grunt build` to do a clean and a fresh recompile

`grunt buildwatch` to clean then compile and place a watcher on the folder that will trigger a recompile in the event of a code change.

`node server` starts a server at http://localhost:3000 to change the port number edit `server.js` you will need different port numbers if you want more than one project open


## Order of compiling (for your reference)

Step 1 - Grunt compiles all html as per old boilerplate to htmlpartials and then it transcode all JSX to javascript from

    public/jsx-special/**/*.jsx
    public/jsx-pages/**/*.jsx

into a javascript file here

    public/jsxcompiled/jsxcompiled.js


Step 2 - Grunt compiles all javascript in order from

    public/js/lib/react.js
    public/js/router/prefix*.js  
    public/js/lib/jquery*.js
    public/js/lib/underscore-min.js
    public/js/lib/backbone-min.js
    public/js/lib/**/*.js
    public/js/config/config.js
    public/js/config/*.js
    public/js/lib_developer/**/*.js
    public/js/components/**/*.js
    public/htmlcompiled/*.js
    public/views-special/**/*.js
    public/views-pages/**/*.js
    public/jsxcompiled/jsxcompiled.js           
    public/js/router/grandcentral.js
    public/js/router/router_base*.js
    public/js/router/router_developer.js
    public/js/router/appstarter*.js

to

    public/prod/start.js

Step 3 - Grunt compiles all css in order from

    public/views-special/**/structure.css
    public/views-special/**/*.css
    public/views-pages/**/*.css
    public/jsx-special/**/*.css
    public/jsx-pages/**/*.css        

to this css file here

    public/prod/start.css


