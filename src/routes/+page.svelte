<script lang="ts">
	import { goto } from '$app/navigation';
	import { en } from '../locale/en.js';

	export let data;

	function handleSubmit(e: SubmitEvent) {
		const data = new FormData(e.target as HTMLFormElement);
		const search = new URLSearchParams(data as any).toString();

		goto(`/?${search.toString()}`);
	}
</script>

<h3 class="mb-8 text-center">{en.home.title}</h3>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" name="search" placeholder="conjugation" />
	<input type="hidden" name="language" value="french" />
	<button>Search</button>
</form>

{JSON.stringify(data.conjugation || {}, null, 2)}
