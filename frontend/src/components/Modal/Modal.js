import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onCancel = useSelector(selectModalOnCancel);
	const onConfirm = useSelector(selectModalOnConfirm);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Нет
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 200;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		height: 100%;
		width: 100%;
	}

	& .box {
		position: relative;
		z-index: 300;
		width: 400px;
		margin: auto;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		padding: 0 20px 20px;
		background: #f2f2f2;
		border: 2px solid #333;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 10px;
	}
`;
