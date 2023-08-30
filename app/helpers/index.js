export default function generateAccountNumber() {
  const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
  return randomNumber;
}
