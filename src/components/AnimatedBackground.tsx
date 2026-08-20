import { useAppContext } from "../context/Context.tsx";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";

import auroraGif from "../assets/gifs/aurora.gif";
import firefliesGif from "../assets/gifs/fireflies.gif";
import geometryGif from "../assets/gifs/geometry.gif";
import glitterGif from "../assets/gifs/glitter.gif";
import matrixGif from "../assets/gifs/matrix.gif";
import oceanNightGif from "../assets/gifs/ocean-night.gif";
import particlesGif from "../assets/gifs/particles.gif";
import rainBlackGif from "../assets/gifs/rain-black.gif";
import rainNightCityGif from "../assets/gifs/rain-night-city.gif";
import rainGif from "../assets/gifs/rain.gif";
import scanlinesGif from "../assets/gifs/scanlines.gif";
import snowGif from "../assets/gifs/snow.gif";
import spaceFlightGif from "../assets/gifs/space-flight.gif";
import starfieldGif from "../assets/gifs/starfield.gif";
import stormBlackGif from "../assets/gifs/storm-black.gif";
import stormGif from "../assets/gifs/storm.gif";
import sun2Gif from "../assets/gifs/sun-2.gif";
import trainGif from "../assets/gifs/train.gif";

// ============================================================================

const additionalStyles: Record<string, string> = {
  [scanlinesGif]: "blur-sm",
  [snowGif]: "blur-sm",
  [rainGif]: "blur-sm contrast-125 brightness-[0.7]",
  [particlesGif]: "blur-sm contrast-[1.15] brightness-[0.8] grayscale",
  [firefliesGif]: "blur-sm brightness-75",
  [starfieldGif]: "blur-sm",
  [matrixGif]: "blur-[5px]",
  [spaceFlightGif]: "blur-sm",
  [oceanNightGif]: "blur-sm",
  [auroraGif]: "blur-sm",
  [geometryGif]: "grayscale brightness-75 contrast-125 blur-[5px]",
  [glitterGif]: "blur-[2px]",
  [rainBlackGif]: "blur-sm",
  [rainNightCityGif]: "blur-[7px] brightness-75 contrast-115 grayscale",
  [stormBlackGif]: "blur-sm",
  [stormGif]: "blur-sm brightness-[0.5] contrast-115",
  [trainGif]: "blur-md grayscale brightness-75 contrast-125 opacity-75",
  [sun2Gif]: "blur-[5px] brightness-50 contrast-125 hue-rotate-[-145deg]",
};

// ============================================================================

const animBgOptions = [
  { name: "Scanlines", url: scanlinesGif },
  { name: "Snow", url: snowGif },
  { name: "Rain", url: rainGif },
  { name: "Particles", url: particlesGif },
  { name: "Fireflies", url: firefliesGif },
  { name: "Starfield", url: starfieldGif },
  { name: "Matrix", url: matrixGif },
  { name: "Space Flight", url: spaceFlightGif },
  { name: "Night Ocean", url: oceanNightGif },
  { name: "Aurora", url: auroraGif },
  { name: "Geometry", url: geometryGif },
  { name: "Glitter", url: glitterGif },
  { name: "Dark Rain", url: rainBlackGif },
  { name: "Rain Window", url: rainNightCityGif },
  { name: "Stormy Sky", url: stormGif },
  { name: "Storm Flashes", url: stormBlackGif },
  { name: "Solaris", url: sun2Gif },
];

// ============================================================================

export default function AnimatedBackground() {
  const { animBgUrl, setAnimBgUrl } = useAppContext();

  const imgTag = animBgUrl ? <img src={animBgUrl} className={`fixed inset-0 h-full w-full -z-10 object-cover ${additionalStyles[animBgUrl] ?? ""}`} alt="" /> : null;

  const storedInLs = localStorage.getItem(LOCAL_STORAGE_KEYS.BACKGROUND);
  const initialValue = storedInLs === "null" ? "" : storedInLs;

  return (
    <>
      {imgTag}

      <div className="flex items-center justify-center gap-4 font-mono text-sm text-emerald-200 transition duration-200 opacity-20 hover:opacity-100">
        {/* absolute bottom-[30px] left-1/2 -translate-x-1/2 */}
        <label htmlFor="animated-bg" className="opacity-60">
          Background:
        </label>

        <select
          value={animBgUrl ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setAnimBgUrl(value === "none" ? null : value);
            localStorage.setItem(LOCAL_STORAGE_KEYS.BACKGROUND, value === "none" ? "null" : value);
          }}
          id="animated-bg"
          className="bg-transparent text-emerald-100 border border-emerald-600/90 px-2 py-1 rounded-sm outline-none focus:border-emerald-300 cursor-pointer"
        >
          <option disabled>Animated bg</option>
          <option value="none">None</option>
          {animBgOptions.map((option) => (
            <option key={option.name} value={option.url}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
