/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

import prevImage from "../assets/images/prev.svg";
import nextImage from "../assets/images/next.svg";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	return (
		<p {...blockProps}>
			<div
				className="eisa-slideshow"
				data-autoscroll={attributes.autoscroll}
				data-scrolltimeout={attributes.autoscrolltimeout}
				data-loop={attributes.loop}
			>
				<div className="eisa-slider-posts-container">
					{attributes.show_nav === true && (
						<div className="eisa-slider-nav-prev">
							<img src={prevImage} alt="" />
						</div>
					)}
					<div className="eisa-slider-posts" post-id="1">
						<div className="eisa-slider-viewport">
							{attributes.posts.length > 0 &&
								attributes.posts.map((post, index) => {
									// console.log(post);
									return (
										<div className={`slide ${index == 0 ? "active" : ""}`}>
											<a href={post.link} className="slide-post-img-wrap">
												<img
													className="slide-post-img"
													src={post.jetpack_featured_media_url}
													alt={index}
												/>
											</a>
											{attributes.hideid !== true && (
												<div className="slide-post-id">{post.id}</div>
											)}
											{attributes.hidetitle !== true && (
												<a href={post.link}>
													<div className="slide-post-title">
														{post.title.rendered}
													</div>
												</a>
											)}
											{attributes.hidedate !== true && (
												<div className="slide-post-date">{post.date}</div>
											)}
										</div>
									);
								})}
						</div>
					</div>
					{attributes.show_nav === true && (
						<div className="eisa-slider-nav-next">
							<img src={nextImage} alt="" />
						</div>
					)}
				</div>
				{attributes.show_pagination === true && (
					<div className="eisa-slider-navigation">
						{attributes.posts !== null &&
							attributes.posts.map(function (post, index) {
								return (
									<a
										data-slide-index={index}
										className={`${index === 0 ? "active" : ""}`}
									>
										{index + 1}
									</a>
								);
							})}
					</div>
				)}
			</div>
			<style>
				{`
					@media only screen and (min-width: 599px) {
						.eisa-slideshow {
							width: ${attributes.desktopWidth};
							height: ${attributes.desktopHeight};
						}
					}
					@media only screen and (max-width: 600px) {
						.eisa-slideshow {
							width: ${attributes.mobileWidth};
							height: ${attributes.mobileHeight};			
						}
					}
					.fadein{
						animation-duration: ${attributes.animationtime}ms;
					}
					.fadeout{
						animation-duration: ${attributes.animationtime}ms;
					}`}
			</style>
		</p>
	);
}
