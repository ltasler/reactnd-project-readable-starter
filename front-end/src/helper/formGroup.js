import {FormControl, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import React from 'react';

export default function formGroup(id, label, type, placeHolder, prevalue, disabled) {
	let formControl = <FormControl type={type} placeholder={placeHolder} defaultValue={prevalue} disabled={disabled}/>;
	if (type === 'textarea') {
			formControl =
				<FormControl componentClass={type}
				             placeholder={placeHolder}
				             style={{maxWidth: '100%'}}
				             defaultValue={prevalue}
				             disabled={disabled}/>
	}
	return (
		<FormGroup controlId={id}>
			<Col componentClass={ControlLabel} sm={2}>
				{label}
			</Col>
			<Col sm={10}>
				{formControl}
			</Col>
		</FormGroup>
	)

}