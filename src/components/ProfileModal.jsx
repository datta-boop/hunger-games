import { useState, useEffect } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import { Button, Field, Mono, press } from "./ui";
import { AVATARS } from "../constants";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 28px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
`;

const Sub = styled.p`
  margin-top: 8px;
  color: var(--muted);
`;

const Label = styled(Mono).attrs({ as: "label" })`
  display: block;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const Option = styled.button`
  ${press}
  aspect-ratio: 1;
  min-height: 48px;
  border: 0;
  border-radius: 16px;
  font-size: 26px;
  line-height: 1;
  background: ${(p) => (p.$on ? "var(--accent)" : "var(--surface-2)")};
  box-shadow: ${(p) => (p.$on ? "none" : "none")};
  &:hover { background: ${(p) => (p.$on ? "var(--accent)" : "var(--surface-3)")}; }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export function ProfileModal({ open, onClose, profile, onSave }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  useEffect(() => {
    if (open) {
      setName(profile?.username || "");
      setAvatar(profile?.avatar || AVATARS[0]);
    }
  }, [open, profile]);

  const save = () => {
    if (!name.trim()) return;
    onSave({ username: name.trim(), avatar });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{ style: { backgroundColor: "rgb(var(--scrim-rgb) / 0.62)" } }}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 440,
          m: 2,
          borderRadius: "32px",
          backgroundColor: "var(--surface)",
          backgroundImage: "none",
          color: "var(--text)",
          boxShadow: "0 0 0 1px var(--line), 0 32px 80px rgb(var(--shadow-rgb) / 0.6)",
        },
      }}
    >
      <Body>
        <div>
          <Title>{profile ? "Edit your profile" : "Make it yours"}</Title>
          <Sub>Pick an avatar and a name. They sign the reviews you write.</Sub>
        </div>
        <div>
          <Label>Avatar</Label>
          <Grid>
            {AVATARS.map((e) => (
              <Option key={e} type="button" $on={avatar === e} aria-pressed={avatar === e} onClick={() => setAvatar(e)}>
                {e}
              </Option>
            ))}
          </Grid>
        </div>
        <div>
          <Label htmlFor="profile-name">Display name</Label>
          <Field
            id="profile-name"
            value={name}
            maxLength={30}
            placeholder="e.g. Datta"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
          />
        </div>
        <Actions>
          <Button style={{ flex: 1 }} onClick={save} disabled={!name.trim()}>
            Save profile
          </Button>
          <Button $tone="ghost" onClick={onClose}>
            Cancel
          </Button>
        </Actions>
      </Body>
    </Dialog>
  );
}
