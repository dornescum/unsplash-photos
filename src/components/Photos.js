import React from 'react';

const Photos = ({urls: {regular}, alt_description, likes, user: {name, portfolio_url, profile_image: {medium}}}) => {
	return (
		<article>
			<img src={regular} alt={alt_description} className="h-96 w-96 object-cover "/>
			<div className="bg-pink-100">
				<div className=" flex justify-between px-2">
					<h4>Author: {name}</h4>
					<p className="text-2xl">{likes}</p>
				</div>
				<div className="flex justify-end">
					<a href={portfolio_url}>
						<img src={medium} alt={name} className='h-12 w-12 rounded-full'/>
					</a>
				</div>

			</div>
		</article>
	);
};

export default Photos;
