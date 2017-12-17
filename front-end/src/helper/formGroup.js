import {FormControl, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import React from 'react';

export default function formGroup(id, label, type, placeHolder, prevalue) {
	let formControl = <FormControl type={type} placeholder={placeHolder}/>;
	if (type === 'textarea') {
		if(prevalue) {
			formControl =
				<FormControl componentClass={type}
				             placeholder={placeHolder}
				             style={{maxWidth: '100%'}}
				             defaultValue={prevalue}/>
		} else {
			formControl =
				<FormControl componentClass={type}
				             placeholder={placeHolder}
				             style={{maxWidth: '100%'}}/>
		}
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