import { useState } from "react";

export const useModal = () => {
	const [showModal, setShowModal] = useState(false);

	const onShowModal = () => {
		setShowModal(true);
	};

	const onHideModal = () => {
		setShowModal(false);
	};

	return { showModal, onShowModal, onHideModal };
};
