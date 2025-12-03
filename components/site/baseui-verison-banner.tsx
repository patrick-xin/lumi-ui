export const BaseUIVersionBanner = () => {
  return (
    <div className="flex justify-center absolute -top-10 inset-x-0">
      <span className="text-center text-xs font-semibold inline-flex bg-accent py-1 px-2 border rounded-md">
        Base UI version: <span>1.0.0-beta.7</span>
      </span>
    </div>
  );
};
