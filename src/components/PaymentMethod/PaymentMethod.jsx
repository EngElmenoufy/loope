function PaymentMethod({ method, onChangeMethod }) {
  return (
    <div className="my-4 flex gap-4">
      <div
        className={`w-20 border border-gray-300 rounded-lg flex flex-col items-center p-1 cursor-pointer ${method === "cash" ? "!border-black !border-2" : ""}`}
        onClick={() =>
          onChangeMethod((prev) => ({ ...prev, paymentMethod: "cash" }))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#18403c"
        >
          <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
        </svg>
        <span className="text-sm">Cash</span>
      </div>
      <div
        className={`w-20 border border-gray-300 rounded-lg flex flex-col items-center p-1 cursor-pointer ${method === "card" ? "!border-black !border-2" : ""}`}
        onClick={() =>
          onChangeMethod((prev) => ({ ...prev, paymentMethod: "card" }))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#18403c"
        >
          <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
        </svg>
        <span className="text-sm">Card</span>
      </div>
    </div>
  );
}

export default PaymentMethod;
