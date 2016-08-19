describe('Suite of Tests for Firefly Page', function() {
	var component, element, one, two;
	var initialItemCount = 3; 											//adjust if firefly.jsx triggers more initial items

	beforeAll(function() {

		element = React.createElement(
			rc.fireflyPageComponent,
			{}
		);

		component = reactTestUtils.renderIntoDocument(element);

	});

	beforeEach(function(){
		one = reactTestUtils.findRenderedDOMComponentWithClass(component, 'one');	//***TO DISCUSS: This can probably move to beforeAll not sure why I put it here
		two = reactTestUtils.findRenderedDOMComponentWithClass(component, 'two');
	});

	it('The Firefly Page component renders to the page', function() {
		console.log('The Firefly Page component should render without errors');

		expect(function() {
			component;
		}).not.toThrow();
	});

	it('Grand Central Exists', function(){								//This component relies heavily on Grand Central so make sure it exists
		console.log("typeof GrandCentral = ", typeof grandCentral);
		expect(typeof grandCentral).not.toBe("undefined")				//***TO DISCUSS: is this a platform test or component test or not needed at all,
																		//Should there be more thorough grandCentral tests, make sure on/off/trigger exist?
	});

	it('Make Sure Initial Triggers Populate', function(){
		console.log("Make Sure Initial Triggers Populate")
		console.log(one);
		console.log(one.children.length);

		expect(one.children.length).toBe(initialItemCount);
	});

	it('Make sure Clicking manipluates properly', function() {
		console.log("Testing Click Events from ONE to TWO");
		
		var origFirstText = one.children[0].textContent;				//store text for test later

		reactTestUtils.Simulate.click(one.children[0]);					//Click the first entry in the first section

		expect(one.children.length).toBe(initialItemCount-1);			//We should lose one item
		expect(two.children.length).toBe(1);							//should gain one

																		//*** TO DISCUSS: Reason to split into separate it()'s
		console.log("Testing Click Events from TWO to ONE");

		reactTestUtils.Simulate.click(two.children[0]);					//click the first entry in the second section

		expect(one.children.length).toBe(initialItemCount);				//we should revert to original state
		expect(two.children.length).toBe(0);


		console.log("Orig First Text is now in 3rd position");

		expect(one.children[0].textContent).not.toBe(origFirstText); 	
		expect(one.children[initialItemCount - 1].textContent).toBe(origFirstText);
	});

});