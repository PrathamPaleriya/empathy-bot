import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Dropdown } from 'primereact/dropdown';

const OnBoardingInput = ({ loading = false, alert = false, handleSubmit, linkText, linkHref }) => {
  const language = ['English', 'Hindi', 'Hinglish'];
  const gender = ['Male', 'Female', 'Third Gender', 'Not to mention.'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full font-manrope">
      <div>
        <div className="my-3 md:text-xl font-semibold text-heading">
          Pick a language you're comfy in. 🧐
        </div>
        <Dropdown
          options={language}
          placeholder="Pick a language."
          className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          panelClassName="bg-white border border-placeholder px-5 py-3 rounded-2xl w-fit"
          required
        />
      </div>
      <div className="flex items-center justify-between w-full gap-5">
        <div className="flex-1">
          <div className="my-3 md:text-xl font-semibold text-heading">How young? 🎂</div>
          <input
            type="number"
            placeholder="Enter your age"
            defaultValue={18}
            required
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          />
        </div>
        <div className="flex-1">
          <div className="my-3 md:text-xl font-semibold text-heading">Your Gender</div>
          <Dropdown
            options={gender}
            placeholder="Select your gender."
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
            panelClassName="bg-white border border-placeholder px-5 py-3 rounded-2xl w-fit"
            required
          />
        </div>
      </div>
      <div>
        <div className="my-3 md:text-xl font-semibold text-heading">Pick my vibe age 🤖</div>
        <Dropdown
          options={language}
          placeholder="Wanna talk to a chill friend or a wise buddy?"
          className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          panelClassName="bg-white border border-placeholder px-5 py-3 rounded-2xl w-fit"
          required
        />
      </div>
      <div>
        <div className="my-3 md:text-xl font-semibold text-heading">
          What's our relationship status? 💞
        </div>
        <Dropdown
          options={language}
          placeholder="Pick the vibe you need most."
          className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          panelClassName="bg-white border border-placeholder px-5 py-3 rounded-2xl w-fit"
          required
        />
      </div>

      <button
        type="password"
        className="bg-accent border text-white font-semibold border-accent my-8 px-5 py-3 rounded-2xl w-full"
      >
        {loading ? (
          <BarLoader className="my-2 mx-auto" color="white" />
        ) : alert ? (
          <div className="text-white w-full truncate">Invalid email or password</div>
        ) : (
          <div>Continue</div>
        )}
      </button>
    </form>
  );
};

export default OnBoardingInput;
