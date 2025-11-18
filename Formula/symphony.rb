class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.2.1"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.1/symphony-darwin-x64.tar.gz"
      sha256 "a42ab216a4e365e8c2b453f12b7db53b0b0997c25dfd3e5bbddcb518f98c2d6d"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.1/symphony-darwin-arm64.tar.gz"
      sha256 "c6c4e179994d7ffe2a0fa579d0c160e4f8bc5deddf1a014c56e75c7da3726f3e"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
