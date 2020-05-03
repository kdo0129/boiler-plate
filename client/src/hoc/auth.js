import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
import { withRouter } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {
	function AuthenticationCheck(props) {
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(auth()).then((res) => {
				if (!res.payload.isAuth) {
					if (option) {
						props.history.push('/login');
					}
				} else {
					if (adminRoute && !res.payload.isAdmin) {
						props.history.push('/');
					} else {
						if (option === false) {
							props.history.push('/');
						}
					}
				}
			});
		}, [dispatch, props.history]);
		return <SpecificComponent />;
	}

	return withRouter(AuthenticationCheck);
}
