/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import fetch from "node-fetch";
import React, { useEffect } from "react";
import prevImage from "../assets/images/prev.svg";
import nextImage from "../assets/images/next.svg";
import {
	TextControl,
	SelectControl,
	CheckboxControl,
} from "@wordpress/components";
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const onChangeNavigation = (new_show_nav) => {
		setAttributes({ component_updated: true });
		setAttributes({ show_nav: parseInt(new_show_nav) });
	};
	const onChangePagination = (new_show_pagination) => {
		setAttributes({ component_updated: true });
		setAttributes({ show_pagination: parseInt(new_show_pagination) });
	};
	const setAPIURL = (new_API_url) => {
		setAttributes({ reload_posts: true });
		setAttributes({ apiurl: new_API_url });
		setAttributes({ component_updated: true });
	};

	const setWidth = (newWidth, device) => {
		// debugger;
		if (device == "desktop") {
			setAttributes({ desktopWidth: newWidth });
		} else {
			setAttributes({ mobileWidth: newWidth });
		}
		setAttributes({ component_updated: true });
	};

	const setHeight = (newHeight, device) => {
		if (device == "desktop") {
			setAttributes({ desktopHeight: newHeight });
		} else {
			setAttributes({ mobileHeight: newHeight });
		}
		setAttributes({ component_updated: true });
	};

	const setHideId = (newhideId) => {
		setAttributes({ hideid: newhideId });
		setAttributes({ component_updated: true });
	};
	const setHideDate = (newhidedate) => {
		setAttributes({ hidedate: newhidedate });
		setAttributes({ component_updated: true });
	};
	const setHideTitle = (newhidetitle) => {
		setAttributes({ hidetitle: newhidetitle });
		setAttributes({ component_updated: true });
	};
	const setAutoscroll = (newAutoscroll) => {
		setAttributes({ autoscroll: newAutoscroll });
		setAttributes({ component_updated: true });
	};

	const setAutoscrolltimeout = (newAutoscrolltimeout) => {
		setAttributes({ autoscrolltimeout: newAutoscrolltimeout });
		setAttributes({ component_updated: true });
	};

	const setAnimationtime = (newAnimationtime) => {
		setAttributes({ animationtime: newAnimationtime });
		setAttributes({ component_updated: true });
	};
	const setLoop = (newLoop) => {
		setAttributes({ loop: newLoop });
		setAttributes({ component_updated: true });
	};

	useEffect(() => {
		console.log("useeffect");

		const fetchData = async () => {
			const result = await fetch(attributes.apiurl, {
				cache: "no-cache",
				headers: {
					"user-agent": "WP Block",
					"content-type": "application/json",
				},
				method: "GET",
				redirect: "follow",
				referrer: "no-referrer",
			})
				.then((returned) => {
					if (returned.ok) return returned;
					throw new Error("Network response was not ok.");
				})
				.catch(function (error) {
					console.log(error);
				});
			let data = await result.json();
			setAttributes({ posts: data });
			setAttributes({ component_updated: false });
			setAttributes({ reload_posts: false });
		};

		if (attributes.reload_posts == true) {
			fetchData().then(() => {});
		}
	}, [attributes.component_updated]);

	return (
		<p {...blockProps}>
			<InspectorControls key="setting">
				<div id="gutenpride-controls" style={{ padding: "5px" }}>
					<h1>Set the app URL</h1>
					<fieldset>
						<TextControl
							label="API URL"
							value={attributes.apiurl}
							onChange={(value) => setAPIURL(value)}
						/>
					</fieldset>
					<h1>Controls</h1>
					<fieldset>
						<SelectControl
							label="Show navigation"
							value={attributes.show_nav}
							options={[
								{ label: "Yes", value: 1 },
								{ label: "No", value: 0 },
							]}
							onChange={(newShowNavigation) =>
								onChangeNavigation(newShowNavigation)
							}
							__nextHasNoMarginBottom
						/>
					</fieldset>
					<fieldset>
						<SelectControl
							label="Show pagination"
							value={attributes.show_pagination}
							options={[
								{ label: "Yes", value: 1 },
								{ label: "No", value: 0 },
							]}
							onChange={(newShowPagination) =>
								onChangePagination(newShowPagination)
							}
							__nextHasNoMarginBottom
						/>
					</fieldset>
					<h1>Responsiveness</h1>
					<fieldset>
						<TextControl
							label="Desktop Width (200px)"
							value={attributes.desktopWidth}
							onChange={(value) => setWidth(value, "desktop")}
						/>
					</fieldset>
					<fieldset>
						<TextControl
							label="Desktop Height (200px)"
							value={attributes.desktopHeight}
							onChange={(value) => setHeight(value, "desktop")}
						/>
					</fieldset>
					<fieldset>
						<TextControl
							label="Mobile Width (200px)"
							value={attributes.mobileWidth}
							onChange={(value) => setWidth(value, "mobile")}
						/>
					</fieldset>
					<fieldset>
						<TextControl
							label="Mobile Height (200px)"
							value={attributes.mobileHeight}
							onChange={(value) => setHeight(value, "mobile")}
						/>
					</fieldset>

					<h1>Content</h1>
					<fieldset>
						<CheckboxControl
							label="Hide title"
							help="Enabling this option hides the slide title"
							checked={attributes.hidetitle}
							onChange={(value) => {
								setHideTitle(value);
							}}
						/>
					</fieldset>
					<fieldset>
						<CheckboxControl
							label="Hide date"
							help="Enabling this option hides the slide date"
							checked={attributes.hidedate}
							onChange={(value) => {
								setHideDate(value);
							}}
						/>
					</fieldset>
					<fieldset>
						<CheckboxControl
							label="Hide ID"
							help="Enabling this option hides the slide ID"
							checked={attributes.hideid}
							onChange={(value) => {
								setHideId(value);
							}}
						/>
					</fieldset>
					<h1>Behaviour</h1>
					<fieldset>
						<CheckboxControl
							label="Auto scroll"
							help=""
							checked={attributes.autoscroll}
							onChange={(value) => {
								setAutoscroll(value);
							}}
						/>
					</fieldset>
					<fieldset>
						<NumberControl
							label="Auto scroll time"
							value={attributes.autoscrolltimeout}
							onChange={(value) => {
								setAutoscrolltimeout(value);
							}}
						/>
					</fieldset>
					<fieldset>
						<NumberControl
							label="Animation time"
							value={attributes.animationtime}
							onChange={(value) => {
								setAnimationtime(value);
							}}
						/>
					</fieldset>
					<div style={{ marginTop: "10px" }}>
						<fieldset>
							<CheckboxControl
								label="Loop"
								help="Check this to enable looping"
								checked={attributes.loop}
								onChange={(value) => {
									setLoop(value);
								}}
							/>
						</fieldset>
					</div>
				</div>
			</InspectorControls>
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
						{attributes.posts.length > 0 &&
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
