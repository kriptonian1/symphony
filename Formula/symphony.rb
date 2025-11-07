class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.1.1"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.1.1/symphony-darwin-x64.tar.gz"
      sha256 "9e09ab9fdf827ea0719cae3a218e7982b584b5d8577396033b590392018b52a3"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.1.1/symphony-darwin-arm64.tar.gz"
      sha256 "c436dadcb357841fe14c4b4a23e1e11b3bce453da1f0c9efed3d9354d03a23a1"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
