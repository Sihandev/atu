/**
 * Katalog kendaraan yang umum beredar di Indonesia. Opsi "Lainnya" selalu
 * tersedia agar model baru, CBU, kendaraan klasik, dan unit khusus tetap bisa
 * dimasukkan tanpa menunggu pembaruan aplikasi.
 */
export const vehicleCatalog = {
  Toyota: ["Agya", "Calya", "Avanza", "Veloz", "Raize", "Rush", "Yaris", "Yaris Cross", "Corolla Cross", "Kijang Innova", "Kijang Innova Zenix", "Fortuner", "Hilux", "HiAce", "Alphard", "Vellfire", "Camry", "Corolla Altis", "GR Yaris", "GR 86", "bZ4X"],
  Daihatsu: ["Ayla", "Sigra", "Xenia", "Rocky", "Terios", "Gran Max", "Luxio", "Sirion"],
  Honda: ["Brio", "Mobilio", "City", "City Hatchback", "WR-V", "BR-V", "HR-V", "CR-V", "Civic", "Accord", "e:N1", "Prelude"],
  Mitsubishi: ["Xpander", "Xpander Cross", "Xforce", "Destinator", "Pajero Sport", "Triton", "L300", "Outlander PHEV", "L100 EV"],
  Suzuki: ["S-Presso", "Ignis", "Baleno", "Fronx", "Ertiga", "XL7", "Jimny", "Grand Vitara", "Carry", "APV"],
  Isuzu: ["Traga", "D-Max", "mu-X", "NLR", "NMR", "NPR", "FRR", "FVR", "GIGA"],
  Nissan: ["Livina", "Serena", "Kicks e-Power", "X-Trail", "Terra", "Leaf", "Magnite", "Navara"],
  Mazda: ["Mazda2", "Mazda3", "CX-3", "CX-30", "CX-5", "CX-60", "CX-8", "CX-80", "MX-5"],
  Subaru: ["Crosstrek", "Forester", "Outback", "BRZ", "WRX", "WRX Wagon"],
  Hyundai: ["Grand i10", "Stargazer", "Stargazer X", "Creta", "Tucson", "Santa Fe", "Palisade", "Staria", "Kona Electric", "Ioniq 5", "Ioniq 6", "Ioniq 9"],
  Kia: ["Sonet", "Seltos", "Carens", "Carnival", "Sportage", "Sorento", "EV3", "EV6", "EV9"],
  Wuling: ["Air ev", "BinguoEV", "Cloud EV", "Alvez", "Almaz", "Confero", "Cortez", "Formo", "Mitra EV", "Darion"],
  Chery: ["Tiggo Cross", "Tiggo 5X", "Tiggo 7 Pro", "Tiggo 8", "Tiggo 9", "Omoda 5", "Omoda E5", "J6", "E5"],
  Jaecoo: ["J5", "J7", "J8"],
  BYD: ["Atto 1", "Atto 2", "Atto 3", "Dolphin", "Seal", "Sealion 7", "M6"],
  Denza: ["D9", "N7", "Z9 GT"],
  AION: ["Y Plus", "V", "ES", "UT", "Hyptec HT"],
  Geely: ["EX2", "EX5", "Starray EM-i", "Monjaro"],
  GWM: ["Haval Jolion", "Haval H6", "Ora 03", "Tank 300", "Tank 500", "Cannon"],
  MG: ["MG 4 EV", "MG ZS", "MG ZS EV", "MG 5 GT", "MG HS", "MG Cyberster", "MG Maxus 9"],
  VinFast: ["VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9"],
  Neta: ["V-II", "X", "S"],
  Jetour: ["Dashing", "X70 Plus", "T2", "X50e"],
  BAIC: ["BJ30", "BJ40 Plus", "BJ60", "X55 II"],
  DFSK: ["Gelora", "Gelora E", "Super Cab", "Glory 560", "Glory i-Auto"],
  Seres: ["E1", "E3", "7"],
  Ford: ["Ranger", "Everest", "Bronco", "Mustang"],
  Chevrolet: ["Spark", "Trax", "Trailblazer", "Captiva", "Colorado"],
  Volkswagen: ["Polo", "T-Cross", "Tiguan", "Golf", "ID. Buzz"],
  BMW: ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "i4", "i5", "i7", "iX"],
  MINI: ["Cooper", "Countryman", "Aceman"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "EQA", "EQB", "EQS"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7", "Q8", "e-tron GT"],
  Volvo: ["EX30", "EX40", "EC40", "XC60", "XC90", "S90"],
  Lexus: ["LBX", "UX", "NX", "RX", "GX", "LX", "ES", "LS", "RZ", "LM"],
  Land_Rover: ["Defender", "Discovery", "Discovery Sport"],
  Range_Rover: ["Evoque", "Velar", "Sport", "Range Rover"],
  Porsche: ["718", "911", "Macan", "Cayenne", "Panamera", "Taycan"],
  Jeep: ["Wrangler", "Gladiator", "Compass", "Grand Cherokee"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  Peugeot: ["2008", "3008", "5008"],
  Citroen: ["C3", "C3 Aircross", "C5 Aircross", "E-C3"],
  Ferrari: ["Roma", "296", "SF90", "Purosangue"],
  Lamborghini: ["Huracan", "Revuelto", "Urus"],
  Maserati: ["Ghibli", "Grecale", "Levante", "GranTurismo", "MC20"],
  Bentley: ["Continental GT", "Flying Spur", "Bentayga"],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Spectre"],
  Hino: ["Dutro", "Ranger", "Profia", "Bus"],
  "Mitsubishi Fuso": ["Canter", "Fighter X", "Fuso Tractor Head"],
  "UD Trucks": ["Kuzer", "Quester", "Croner"],
} as const;

export type VehicleBrand = keyof typeof vehicleCatalog;

export const vehicleBrands = Object.keys(vehicleCatalog)
  .map((brand) => brand.replaceAll("_", " "))
  .sort((a, b) => a.localeCompare(b, "id"));

export function modelsForBrand(brand: string): readonly string[] {
  const key = brand.replaceAll(" ", "_") as VehicleBrand;
  return vehicleCatalog[key] ?? [];
}

export const vehicleTypes = [
  "City Car / Hatchback",
  "Sedan",
  "MPV",
  "SUV",
  "Pickup",
  "Van / Minibus",
  "Mobil Sport",
  "Mobil Listrik",
  "Truk",
  "Bus",
  "Motor",
  "Alat Berat",
] as const;

export const vehicleTransmissions = ["Manual", "Otomatis", "CVT", "DCT", "Lainnya"] as const;
export const vehicleFuels = ["Bensin", "Diesel", "Hybrid", "Plug-in Hybrid", "Listrik", "Lainnya"] as const;
