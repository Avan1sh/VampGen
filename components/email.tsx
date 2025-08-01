import {Input} from "@heroui/react";

export default function App() {
  const colors = [ "warning"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {colors.map((color) => (
        <Input
          key={color}
          className="max-w-[220px]"
          color={color}
          defaultValue="junior@heroui.com"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
      ))}
    </div>
  );
}
