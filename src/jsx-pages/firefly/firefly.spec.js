describe('Suite of Tests for Firefly Page', function() {
	var component, element, one, two;
	var initialItemCount = 3; 											//adjust if firefly.jsx triggers more initial items

	beforeAll(function() {

		element = React.createElement(
			rc.fireflyPageComponent,
			{}
		);

		component = reactTestUtils.renderIntoDocument(element);

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

	describe('Sub Suite of Click Tests', function(){
		var origFirstText;

		beforeAll(function(){
			origFirstText = one.children[0].textContent;					//store text for test later

			reactTestUtils.Simulate.click(one.children[0]);					//Click the first entry in the first section
		});

		beforeEach(function(){

		});

		it('Make sure Clicking item in div 1 works', function() {
			console.log("Testing Click Events from ONE to TWO");
			
			expect(one.children.length).toBe(initialItemCount-1);			//We should lose one item
			expect(two.children.length).toBe(1);							//should gain one
		});
		
		it('Make sure container one has divs and two has imgs', function(){
			console.log("Make sure container one has divs and two has imgs")	//*** TO DISCUSS: this is an unrelated test to actual clicking but is nice to test after a click
			
			expect(one.children[0].nodeName.toLowerCase()).toBe("div");
			expect(two.children[0].nodeName.toLowerCase()).toBe("img");
			expect(two.children[0].hasAttribute("src")).toBe(true);
		});
			
		it('Testing Click Events from TWO to ONE', function(){
			console.log("Testing Click Events from TWO to ONE");

			reactTestUtils.Simulate.click(two.children[0]);					//click the first entry in the second section

			expect(one.children.length).toBe(initialItemCount);				//we should have reverted to original counts
			expect(two.children.length).toBe(0);
		});

		it('Orig First Text is now in 3rd position', function(){
			console.log("Orig First Text is now in 3rd position");

			expect(one.children[0].textContent).not.toBe(origFirstText); 	
			expect(one.children[initialItemCount - 1].textContent).toBe(origFirstText);
		});
	});

















	it('Make sure Clicking manipluates properly - jQuery Edition', function(){
		console.log("Testing Click Events from ONE to TWO");
		
		//var origFirstText = jQuery(".one > div:first-child").html();

		//reactTestUtils.Simulate.click(jQuery(".one > div:first-child")[0]);		
		//jQuery(".one > div:first-child").click();

		//console.log($("body").html())

		//expect($(".one > div")).toHaveLength(3)


/*	var spyEvent = spyOnEvent('.one > div:first-child', 'click')
	$('.one > div:first-child').click()
	expect('click').toHaveBeenTriggeredOn('.one > div:first-child')
	expect(spyEvent).toHaveBeenTriggered()*/


		/*expect(jQuery(".one > div").length).toBe(initialItemCount-1);		
		expect(jQuery(".two > img").length).toBe(1);						

		
		console.log("Make sure container one has divs and two has imgs");
		
		expect(jQuery(".one > div:first-child").is("div")).toBe(true);	//Uses is filter
		expect(jQuery(".two > img:first-child").is("img")).toBe(true);
		expect(jQuery(".two > img:first-child").is("[src]")).toBe(true); //filters on src attribute

		
		console.log("Testing Click Events from TWO to ONE");

		//reactTestUtils.Simulate.click(jQuery(".two > div:first-child"));
		jQuery(".two > img:first-child").click();

		expect(jQuery(".one > div").length).toBe(initialItemCount);
		expect(jQuery(".two > img").length).toBe(0);


		console.log("Orig First Text is now in 3rd position");

		expect(jQuery(".one > div:first-child").html()).not.toBe(origFirstText); 	
		expect(jQuery(".one > div:last-child").html()).toBe(origFirstText);*/
	});

});