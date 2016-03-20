Work in progress as I convert this to GULP for the Macmillan team


add the following to the 2015 documentation
- added hooks postPageChange()  and   postRouteChange()
- swapped build tool from grunt to gulp
- moved source files out of the public folder to /src
- TO DO bring in the pass through end point code with Amazon STS into node layer
- unit testing
- checksum on files that shouldn't be edited
- sass so we can use nesting