import { useStore } from '@nanostores/preact';
import { probability, isPhishing } from '../dataStore';

export default function AlertBox() {

	const $probability = useStore(probability);
	const $isPhishing = useStore(isPhishing);
	return (
		<div>
			<div class={$isPhishing == 1 ? '' : 'hidden'}>
				<div
					class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
					role="alert"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 inline w-5 h-5 mr-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"></path></svg
					>
					<span class="sr-only">Info</span>
					<div>
						<span class="font-medium">Phishing Link Detected! </span>
						There is an {$probability}% chance that the link is malicious
					</div>
				</div>
			</div>

			<div class={$isPhishing == -1 ? '' : 'hidden'}>
				<div
					class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
					role="alert"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 inline w-5 h-5 mr-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"></path></svg
					>
					<span class="sr-only">Info</span>
					<div>
						<span class="font-medium">Link is Probably Safe!</span>
					</div>
				</div>
			</div>

			<div class={$isPhishing == -2 ? '' : 'hidden'}>
				<div class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
					<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
					<span class="sr-only">Info</span>
					<div>
						<span class="font-medium">Alert!</span> Please input a url with the format schema://hostname.
					</div>
				</div>
			</div>

		</div>


	);
}