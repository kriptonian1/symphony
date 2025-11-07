class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.1.0"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.1.0/symphony-darwin-x64.tar.gz"
      sha256 "2818b82dcbe9c1aaa825605ac0015bf3b74ce9c7c7a2a91566b64e196cf267fb"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.1.0/symphony-darwin-arm64.tar.gz"
      sha256 "b29f9b7b65a31e4590cac6c01f55740cf3ea6ff47a2c83058e59da7812067acc"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
