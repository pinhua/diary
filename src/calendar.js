import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function CalendarGfg() {
	const [value, onChange] = useState(new Date());
	return (
		<div>
			<h1>Calendar</h1>
			<Calendar value={value} onChange={onChange} />
		</div>
	);
}
