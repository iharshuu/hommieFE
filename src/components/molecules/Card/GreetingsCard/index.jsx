import React from 'react';
import evening from '../../../../assets/image/greetings/good_night.svg';
import morning from "../../../../assets/image/greetings/good_morning.svg";
import afternoon from "../../../../assets/image/greetings/good_afternoon.svg";

const GreetingsCard = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let greetingMessage = '';
    let imageSource; // Declare imageSource variable

    if (currentHour >= 4 && currentHour < 12) {
        greetingMessage = 'Good morning';
        imageSource = morning; // Set image source for 'Good morning'
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good afternoon';
        imageSource = afternoon; // Set image source for 'Good afternoon'
    } else {
        greetingMessage = 'Good evening';
        imageSource = evening; // Set image source for 'Good evening'
    }

    return (
        <div className="">
            <div className="flex justify-center">
                <img
                    src={imageSource}
                    alt="Card Image"
                    className="h-16"
                />
            </div>
            <div className="text-center mt-6">
                <h1 className="text-3xl font-bold text-[#252A31] capitalize">{greetingMessage}</h1>
            </div>
            <div className="text-center sm:mx-3 mt-2">
                <p className="text-base text-gray-500 leading-8">
                    Here’s all list of hostels and recent updates related to them
                </p>
            </div>
        </div>
    );
};

export default GreetingsCard;
