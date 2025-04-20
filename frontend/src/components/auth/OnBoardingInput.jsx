import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Dropdown } from 'primereact/dropdown';
import useAuthAPI from '../../libs/api_auth';
import { useNavigate } from 'react-router-dom';

const OnBoardingInput = () => {
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [lang, setLang] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [vibeAge, setVibeAge] = useState(null);
  const languageOpt = ['English', 'Hindi', 'Hinglish'];
  const genderOpt = ['Male', 'Female', 'Third Gender', 'Not to mention.'];
  const vibeAgeOpt = [
    'Kiddo (8-12) 🧃✨',
    'Teenager (15-18) 🎧🔥',
    'Young Adult (21-25) 🏄‍♀️💬',
    'Big Bro/Sis (25-30) 👕🫂',
    'Cool Aunt/Uncle (35-45) 😎🍪',
    'The Wise One (50+) 🧘‍♂️📚',
  ];

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { onboard } = useAuthAPI();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const coreMemory = {
      user_core: {
        name: name,
        country: country,
        age: age,
        gender: gender,
      },
      assistant_core: {
        age: vibeAge,
        language: lang,
      },
    };

    const res = await onboard(coreMemory);
    if (res.success) {
      navigate('/chat');
    } else {
      setAlert(res.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full font-manrope">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
        <div className="w-full md:flex-1">
          <div className="my-3 md:text-xl font-semibold text-heading">Your Name </div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your Name"
            required
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          />
        </div>
        <div className="w-full md:flex-1">
          <div className="my-3 md:text-xl font-semibold text-heading">Country you belong 🌍 </div>
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="Enter your Country."
            required
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          />
        </div>
      </div>
      <div>
        <div className="my-3 md:text-xl font-semibold text-heading">
          Pick a language you're comfy in. 🧐
        </div>
        <Dropdown
          value={lang}
          onChange={e => setLang(e.target.value)}
          options={languageOpt}
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
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Enter your age"
            defaultValue={18}
            required
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
          />
        </div>
        <div className="flex-1">
          <div className="my-3 md:text-xl font-semibold text-heading">Your Gender</div>
          <Dropdown
            options={genderOpt}
            value={gender}
            onChange={e => setGender(e.target.value)}
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
          options={vibeAgeOpt}
          value={vibeAge}
          onChange={e => setVibeAge(e.target.value)}
          placeholder="Wanna talk to a chill friend or a wise buddy?"
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
