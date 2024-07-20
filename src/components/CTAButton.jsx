function CTAButton(props) {
    return (
        <button type={props.type?props.type:''} onClick={props.action} className='w-full bg-purple-700 text-white h-10 rounded-sm px-4 hover:bg-purple-500 hover:text-black hover:font-bold flex items-center justify-center my-4' >{props.text}</button>
    );
}

export default CTAButton;