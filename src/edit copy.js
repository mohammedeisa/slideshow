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
import React, { useState, useEffect } from "react";
import prevImage from "../assets/images/prev.svg";
import nextImage from "../assets/images/next.svg";
import { TextControl, SelectControl } from "@wordpress/components";
import ServerSideRender from "@wordpress/server-side-render";

import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
} from "@wordpress/block-editor";
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
		setAttributes({ component_updated: 1 });
		setAttributes({ show_nav: parseInt(new_show_nav) });
	};
	const onChangePagination = (new_show_pagination) => {
		setAttributes({ component_updated: 1 });
		setAttributes({ show_pagination: parseInt(new_show_pagination) });
	};
	useEffect(() => {
		console.log("useeffect");
		const fetchData = async () => {
			const result = await fetch("https://wptavern.com/wp-json/wp/v2/posts", {
				cache: "no-cache",
				headers: {
					"user-agent": "WP Block",
					"content-type": "application/json",
				},
				method: "GET",
				redirect: "follow",
				referrer: "no-referrer",
			}).then((returned) => {
				if (returned.ok) return returned;
				throw new Error("Network response was not ok.");
			});
			let data = await result.json();

			setAttributes({ posts: data });
			setAttributes({ component_updated: 0 });
		};

		fetchData().then(() => {
			if (document.getElementsByClassName("eisa-slider-posts").length > 0) {
				const sliders = document.querySelectorAll(".eisa-slider-posts");
				for (let index = 0; index < sliders.length; index++) {
					const sliderWidth = sliders[index].offsetWidth;
					setAttributes({ width: sliderWidth });
					const slides = sliders[index].querySelectorAll(".slide");
					for (let slideIndex = 0; slideIndex < slides.length; slideIndex++) {
						slides[slideIndex].style.width = sliderWidth + "px";
					}
				}
			}
		});
	}, [attributes.component_updated]);

	return (
		<p {...blockProps}>
		
			<InspectorControls key="setting">
				<div id="gutenpride-controls">
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
				</div>
			</InspectorControls>
			<div className="eisa-slideshow">
				<div className="eisa-slider-posts-container">
					{attributes.show_nav === 1 && (
						<div className="eisa-slider-nav-prev">
							<img src={prevImage} alt="" />
						</div>
					)}
					<div
						className="eisa-slider-posts"
						post-id="1"
						style={{ width: attributes.width + "px" }}
					>
						<div className="eisa-slider-viewport">
							{attributes.posts !== null &&
								attributes.posts.map((post, index) => {
									return (
										<div
											className={`slide ${index == 0 ? "active" : ""}`}
											style={{ width: attributes.width + "px" }}
										>
											<img src={post.jetpack_featured_media_url} alt={index} />
											<div>{post.id}</div>
											<div> {post.title.rendered}</div>
										</div>
									);
								})}
						</div>
					</div>
					{attributes.show_nav === 1 && (
						<div className="eisa-slider-nav-next">
							<img src={nextImage} alt="" />
						</div>
					)}
				</div>
				{attributes.show_pagination === 1 && (
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
		</p>
	);
}
