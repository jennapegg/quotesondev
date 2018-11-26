<?php
/**
 * The main template file.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		<i class="fas fa-quote-left"></i>
	<div class="quote-div">

		<?php 
		if ( have_posts() ) :
			while( have_posts() ): the_post();

			get_template_part( 'template-parts/content' );

			endwhile;

			else:
				get_template_part( 'template-parts/content', 'none' );

		endif; 
		?>
		</div>
		<i class="fas fa-quote-right"></i>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
