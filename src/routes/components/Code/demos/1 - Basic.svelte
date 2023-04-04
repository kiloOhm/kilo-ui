<script lang="ts">
	import { KCode } from '$lib';
	import 'prismjs/components/prism-c';

	const code = `
include<stdio.c> 

int main() 
{ 
	printf("Hello World!"); 
	return 0; 
} 
	`;
</script>

<KCode language="C" {code} />
