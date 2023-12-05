// import PhoneNumber from "awesome-phonenumber";
// import React from "react";
// import { TextField } from "@mui/material";
// import {PhoneInputProps} from "@/app/models";
//
//
// function PhoneInput({ name, value, onChange }: PhoneInputProps) {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const phoneNumber = new PhoneNumber(event.target.value);
//     if (phoneNumber.isValid()) {
//       onChange({
//         target: {
//           name,
//           value: phoneNumber.getNumber("international"),
//         },
//       });
//     }
//   };
//
//   return (
//      <TextField
//         label="Phone Number"
//         name={name}
//         value={value}
//         onChange={handleChange}
//         helperText="+1 or +380 prefixes supported"
//         InputProps={{
//           inputProps: {
//             type: "tel",
//           },
//         }}
//      />
//   );
// }
//
// export default PhoneInput;
