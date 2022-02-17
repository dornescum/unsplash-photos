import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

const Photos = ({urls: {regular}, alt_description, likes, user: {name, portfolio_url, profile_image: {medium}}}) => {
	return (
		<article className='relative'>
			<img src={regular} alt={alt_description} className="h-96 w-96 object-cover "/>
			<div className=" bottom-0 w-full h-12 opacity-0 hover:opacity-100 duration-300 absolute  z-10 flex flex-col">
				<ul className=" flex justify-between items-center px-2">
					<div className=" flex text-white cursor-wait">
						<p className='text-2xl font-thin pr-4'> {name}</p>
						<div className='flex items-center justify-center'>
							<AiFillHeart color='red' />
							<span className='font-thin'>
								{likes}
							</span>
						</div>
					</div>
					<a href={portfolio_url} className='cursor-pointer'>
						<img src={medium} alt={name} className='h-12 w-12 rounded-full hover:scale-125 duration-300'/>
					</a>
				</ul>
			</div>
		</article>
	);
};

export default Photos;
