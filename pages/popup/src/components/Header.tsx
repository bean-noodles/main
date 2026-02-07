import Logo from "@src/../public/logo.svg";
import SettingIcon from "@src/../public/icons/setting.svg";
import ProfileIcon from "@src/../public/profile.svg";

export default function Header() {
  return (
    <header>
      <div
        style={{
          width: 300,
          //   height: page === "settings" ? 250 : page === "profile" ? 350 : 400,
          fontFamily: "Pretendard Variable, sans-serif",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <img src={Logo} style={{ width: 118, height: 32 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={SettingIcon}
              style={{ width: 24, height: 24, cursor: "pointer" }}
              //   onClick={() => setPage("settings")}
            />
            <img
              src={ProfileIcon}
              style={{ width: 24, height: 24, cursor: "pointer" }}
              //   onClick={() => setPage("profile")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
