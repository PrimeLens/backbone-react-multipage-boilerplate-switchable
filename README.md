# Work in progress as I convert this to GULP for the Macmillan team

# Add the following to the 2015 documentation
- added hooks postPageChange()  and   postRouteChange()
- swapped build tool from grunt to gulp
- moved source files out of the public folder to /src
- TO DO bring in the pass through end point code with Amazon STS into node layer
- unit testing
- checksum on files that shouldn't be edited
- sass so we can use nesting

# Philosophy notes
- The router is separated or wrapped from the rest of the app so it can be replaced with minimal rewrite if we need to change the tech stack. In this case only the route tunnel function is re-written.
- All react components are siblings hanging off the window level rc object. No component should reach into another to run a method.  We aim for complete decoupling. Components communicate using events via grandCentral. Any parent child relationship required by layout UI only exists in the DOM. This allows for fast designer redesigns.
- Files such as Css sass jsx js html tests for each component should be kept together in the folder for that component. When a component is retired, the folder is moved to the ignore folder. This way we remove that css from compile.
- All css for that component should be scoped (aka prefixed) to that component. You can do this manually for each rule or by using SASS nesting.
-  Components are considered to be for UI use only and therefore should be referred to as the render layer. All code that can be removed from the render layer should be. This includes ajax calls, data transforms and similar. Code like that should be moved out of components to libraries using the module reveal pattern. These are stored in lib_developer folder and are referred to as the data flow layer.
  
# Pre-requisites
- node
- global install of gulp-cli. to do this type npm install --global gulp-cli

# warning for SASS being added
- the usefulness of nesting to force scope of css rules to a component is too good to ignore
- SASS support in gulp only covers nesting and variables
- any SASS complexity you may want above that would be on your own fork and may not be supported by this gulp implementation

# Usage commands
- node server
- gulp build
- gulp clean
- gulp buildwatch
