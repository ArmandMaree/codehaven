import Route from '@ember/routing/route';

export default Route.extend({
	model(params) {
		return this.get('store').findRecord('photo', params.photo_id);
		// return {
		// 	"title": "C++ Pointers",
		// 	"date": "27/05/2018 15:00",
		// 	"long": "Lorem ipsum dolor sit amet, tibique ancillae pericula eos id. Ad quo quis repudiandae, mei ne eros apeirian consequat. Est legere minimum eu, eu nam vocent audiam deseruisse. Dicta dolorum omittantur vim cu. Insolens indoctum ne vis, usu philosophia delicatissimi ad, harum delectus similique pro et.",
		// 	"image": "C++ Pointers.jpg"
		// };
	}
});
