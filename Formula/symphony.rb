class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.2.4"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.4/symphony-darwin-x64.tar.gz"
      sha256 "0d7197b55c144cdf2a58c7d28b110a63a6d574a6ab63f8be7d5db2936625d91f"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.4/symphony-darwin-arm64.tar.gz"
      sha256 "562c97e9ede358a3e8a9b2fc92e59672a31f6da49e54d1a23f8482e27ba543bb"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
