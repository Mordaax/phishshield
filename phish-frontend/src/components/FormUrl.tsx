import type { ComponentChildren } from 'preact';
import { probability, isPhishing } from '../dataStore';
import axios from "axios";

type Props = {

	children: ComponentChildren;
};

export default function FormHolder({ children }: Props) {
	const processText = async (e: SubmitEvent) => {
		e.preventDefault()
		var urlInput = document.getElementById("url") as HTMLInputElement;
		var url = urlInput.value;
		const response = await axios.post("http://localhost:8000/predict", {
			url,
		});
		const responseData = response.data;
		if (responseData.prediction) {
			isPhishing.set(1)
		} else if (responseData.probability == '-1') {
			isPhishing.set(-2)
		}
		else {
			isPhishing.set(-1)
		}

		probability.set(responseData.probability)

		//document.getElementById("showPhish").classList.remove('hidden')
	};

	return <form class="pb-8" onSubmit={processText}>{children}</form>;
}
