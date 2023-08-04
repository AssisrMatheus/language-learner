<script>
	import '../app.css';
	import { en } from '../locale/en';
</script>

<svelte:head>
	<title>{en.title}</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-center p-24">
	<section>
		<slot />
	</section>
</main>
