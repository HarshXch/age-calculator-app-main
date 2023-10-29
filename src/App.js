import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
function App() {
	const [day, setday] = useState({ value: ``, flag: true, flagText: "" });
	const [year, setyear] = useState({ value: ``, flag: true, flagText: "" });
	const [month, setmonth] = useState({ value: ``, flag: true, flagText: "" });
	const dayref = useRef();
	const monthref = useRef();
	const yearref = useRef();
	const [age, setage] = useState({ years: 0, months: 0, days: 0 });
	const calculateAge = () => {
		if (day.value && year.value && month.value) {
			const currentDate = new Date();
			const inputDate = new Date(year.value,month.value, day.value)
			// console.log( month.value, year.value);
			const yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
			const monthDiff = currentDate.getMonth() - inputDate.getMonth();
			const dayDiff = currentDate.getDate() - inputDate.getDate();
			setage({
				years: yearDiff,
				months: monthDiff < 0 ? 12 + monthDiff : monthDiff,
				days: dayDiff < 0 ? 30 + dayDiff : dayDiff,
			});
		}
		(!day.value &&
			(setday((prevState) => ({
				...prevState,
				flagText: "this field is required",
				flag: false,
			})),
			setyear((prevState) => ({
				...prevState,
				flagText: "this field is required",
				flag: false,
			})))) ||
			(!month.value &&
				(setmonth((prevState) => ({
					...prevState,
					flagText: "this field is required",
					flag: false,
				})),
				setyear((prevState) => ({
					...prevState,
					flagText: "this field is required",
					flag: false,
				})))) ||
			(!year.value &&
				setyear((prevState) => ({
					...prevState,
					flagText: "this field is required",
					flag: false,
				})));
	};

	function date(e) {
		let value;
		switch (e.id) {
			case "day":
				value = String(e.value).slice(0, 2);
				console.log(typeof value)
				if (dateRegex.test(parseInt(value))) {
					setday({ value: value, flag: true, flagText: "" });
					if (String(value).length >= "2") {
						monthref.current.focus();
					}
				} else {
					setday({ value: value, flag: false, flagText: "Must be a valid day" });
				}
				break;
			case "month":
				value = String(e.value).slice(0, 2);
				if (monthRegex.test(parseInt(value))) {
					setmonth({ value: value, flag: true, flagText: "" });

					if (String(value).length >= "2") {
						yearref.current.focus();
					}
				} else {
					setmonth({ value: value, flag: false, flagText: "Must be a valid month" });
				}
				break;
			case "year":
				value = String(e.value).slice(0, 4);

				setyear(value);
				if (yearRegex.test(parseInt(value))) {
					setyear({ value: value, flag: true, flagText: "" });
				} else {
					setyear({ value: value, flag: false, flagText: "Must be in the past" });
				}
				break;
			default:
			// console.log(day, month, year);
		}
	}
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-100 py-6 sm:py-12 px-6">
			<img
				src="/beams.jpg"
				alt=""
				className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
				width="100%"
			/>

			<div className="z-0 w-full  lg:w-full max-w-2xl flex flex-col overflow-hidden rounded-2xl rounded-ee-[130px] bg-white p-6 lg:p-8 shadow-xl shadow-gray-100 gap-5 lg:gap-0 ">
				<div className="flex lg:w-10/12 sm:w-full gap-6">
					<div className="h-18 flex w-1/3 flex-col gap-1 overflow-hidden">
						<h6
							className={`font-poppins text-xs font-normal uppercase tracking-widest ${
								!day.flag ? "text-red-200" : "text-gray-500"
							} `}>
							Day
						</h6>
						<input
							className={`font-poppins cursor-pointer rounded-md border border-gray-300 bg-transparent p-[6px] px-3.5 text-[32px] font-bold text-black ${
								!day.flag ? "border-red-200" : ""
							}  focus:border-purple-400 focus:outline-none remove-arrow`}
							placeholder="12"
							value={day.value}
							onChange={(e) => date(e.target)}
							name="day"
							id="day"
							// max={2}
							type="number"
						/>
						<p className="text-[12px] h-4 font-poppins text-red-200 font-light italic">
							{day.flagText}
						</p>
					</div>
					<div className="h-18 flex w-1/3 flex-col gap-1 overflow-hidden">
						<h6
							className={`font-poppins text-xs font-normal uppercase tracking-widest ${
								!month.flag ? "text-red-200" : "text-gray-500"
							} `}>
							Month
						</h6>
						<input
							ref={monthref}
							className={`font-poppins cursor-pointer rounded-md border border-gray-300 bg-transparent p-[6px] px-3.5 text-[32px] font-bold text-black ${
								!month.flag ? "border-red-200" : ""
							}  focus:border-purple-400 focus:outline-none remove-arrow`}
							placeholder="02"
							value={month.value}
							onChange={(e) => date(e.target)}
							name="month"
							id="month"
							// max={2}
							type="number"
						/>
						<p className="text-[12px] font-poppins text-red-200 font-light italic">
							{month.flagText}
						</p>
					</div>
					<div className="h-18 flex w-1/3 flex-col gap-1 overflow-hidden">
						<h6
							className={`font-poppins text-xs font-normal uppercase tracking-widest ${
								!year.flag ? "text-red-200" : "text-gray-500"
							} `}>
							year
						</h6>
						<input
							ref={yearref}
							className={`font-poppins cursor-pointer rounded-md border border-gray-300 bg-transparent p-[6px] px-3.5 text-[32px] font-bold text-black ${
								!year.flag ? "border-red-200" : ""
							}  focus:border-purple-400 focus:outline-none remove-arrow`}
							placeholder="YYYY"
							value={year.value}
							onChange={(e) => date(e.target)}
							name="year"
							id="year"
							// max={2}
							type="number"
						/>
						<p className="text-[12px] font-poppins text-red-200 font-light italic">
							{year.flagText}
						</p>
					</div>
				</div>
				<div className="flex relative h-16  w-full items-center justify-center">
					<hr className="border-1 flex-1 border-gray-300" />
					<div
						className="flex absolute lg:relative justify-center items-center p-2 h-20 w-20 rounded-full bg-black"
						onClick={calculateAge}>
						<img
							src="/assets/images/icon-arrow.svg"
							alt="arrow svg"
						/>
					</div>
				</div>
				<div className="flex h-4/6 w-full flex-col gap-1">
					<h1 className="font-poppins text-5xl lg:text-8xl font-black italic">
						{age.years <= 0 ? (
							<strong className="text-purple-600">-- </strong>
						) : (
							<Counter
								from={0}
								to={age.years}
							/>
						)}{" "}years
					</h1>
					<h1 className="font-poppins text-5xl lg:text-8xl font-black italic">
						{/* <Counter from={0} to ={23}/> */}
						{age.months <= 0 ? (
							<strong className="text-purple-600">-- </strong>
						) : (
							<Counter
								from={0}
								to={age.months}
							/>
						)}{" "}
						months
					</h1>
					<h1 className="font-poppins text-5xl lg:text-8xl font-black italic">
						{age.days <= 0 ? (
							<strong className="text-purple-600">-- </strong>
						) : (
							<Counter
								from={0}
								to={age.days}
							/>
						)}{" "}
						days
					</h1>
				</div>
			</div>
		</div>
	);
}

export default App;
const dateRegex = new RegExp(/^([1-9]|[12][0-9]|3[01])$/);
const monthRegex = new RegExp(/^(0?[1-9]|1[0-2])$/);
const yearRegex = new RegExp(/^(19|20)\d\d$/);
function Counter({ from, to }) {
	const ref = useRef();

	useEffect(() => {
		const controls = animate(from, to, {
			duration: 1,
			onUpdate(value) {
				ref.current.textContent = value.toFixed(0);
			},
		});
		return () => controls.stop();
	}, [from, to]);

	return (
		<strong
			ref={ref}
			className="text-purple-600"></strong>
	);
}
