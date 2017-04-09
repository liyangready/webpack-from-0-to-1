import $ from 'jquery';
import img from './timg.jpg';

if (process.env.NODE_ENV === 'development') {
	console.log('dev');
}
$('<img />').attr('src', img).appendTo('.main');
